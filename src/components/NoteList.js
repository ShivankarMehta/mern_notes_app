import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from 'jspdf';
import "jspdf-autotable";
import { useTheme } from "../Theme/ThemeContext";
const API_USER = process.env.REACT_APP_API_USER;

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${API_USER}/api/notes`, {
          withCredentials: true,
        });
        setNotes(response.data);
        setFilteredNotes(response.data);
        if (response.data.length > 0 && response.data[0].user) {
          setUsername(response.data[0].user.username);
        } else {
          await fetchProfile();
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    };
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_USER}/user/profile`, {
          withCredentials: true,
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchNotes();
  }, [navigate]);

  const sortNotes = (option) => {
    const sorted = [...filteredNotes];
    switch (option) {
      case "newest":
        sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;
      case "oldest":
        sorted.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    setFilteredNotes(sorted);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    sortNotes(option);
  };

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = useRef(debounce((keyword) => {
    const lowerCaseKeyword = keyword.toLowerCase();
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(lowerCaseKeyword) ||
        note.content.toLowerCase().includes(lowerCaseKeyword)
    );
    setFilteredNotes(filtered);
  }, 300));

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    handleSearch(keyword);
  };

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_USER}/api/notes/${id}`, {
        withCredentials: true,
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    navigate(`/create`);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_USER}/user/logout`, {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const exportToPDF= () =>{
    const doc=new jsPDF();

    doc.setFontSize(16);
    doc.text("My Notes", 14,20);

    const tableData=notes.map((note)=>[
        note.title,
        note.content,
        new Date(note.timestamp).toLocaleString(),
    ]);

    doc.autoTable({
        head:[["Title", "Content", "Date"]],
        body:tableData,
        startY:30,
    })
    doc.save("my-notes.pdf");
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color)]">
      {/* Header */}
      <header className="bg-[var(--header-bg-color)] text-[var(--header-text-color)] py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold">Keep Notes</h1>
          <div className="flex items-center space-x-4">
            {username && <span className="text-sm">Hi, {username}</span>}
            <button
            onClick={exportToPDF}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
           >
            Export as PDF
          </button>
            <button
              onClick={handleLogout}
              className="bg-[var(--button-danger)] px-4 py-2 rounded-md hover:bg-[var(--button-danger-hover)] transition"
            >
              Logout
            </button>
            <button
              onClick={toggleTheme}
              className="bg-[var(--button-secondary)] px-4 py-2 rounded-md hover:bg-[var(--button-secondary-hover)]"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between mb-6">
          <input
            type="text"
            value={searchKeyword}
            onChange={handleSearchChange}
            placeholder="Search notes..."
            className="border border-gray-300 rounded-md p-3 w-full mr-4"
          />
          <select
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border border-gray-300 rounded-md p-3"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </div>
        <div>
          <button
            onClick={handleCreate}
            className="bg-[var(--button-primary)] text-white px-6 py-3 rounded-md hover:bg-[var(--button-primary-hover)] transition"
          >
            Add New Note
          </button>
        </div>
        <div className="mt-6">
          {filteredNotes.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredNotes.map((note) => (
                <li
                  key={note._id}
                  className="p-4 border rounded-md shadow-md bg-[var(--bg-color)]"
                  style={{ borderColor: "var(--text-color)" }}
                >
                  <h3 className="text-xl font-bold mb-2" style={{ color: note.color }}>{note.title}</h3>
                  <p className="text-sm text-gray-600 mb-2" style={{ color: note.color }}>{note.content}</p>
                  <small className="block text-gray-400 mb-4">
                    {new Date(note.timestamp).toLocaleString()}
                  </small>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => handleEdit(note._id)}
                      className="bg-yellow-400 px-3 py-1 rounded-md hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="bg-[var(--button-danger)] px-3 py-1 rounded-md hover:bg-[var(--button-danger-hover)] transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No notes available. Start by adding a new note!</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default NotesList;
