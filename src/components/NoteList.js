import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../Theme/ThemeContext';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
function NotesList() {
    const [notes, setNotes] = useState([]);
    const [username, setUsername] = useState('');
    const { theme, toggleTheme } = useTheme();
    const navigate=useNavigate();

    useEffect(() => {
        const fetchNotes= async() =>{
            try{
                const response=await axios.get('http://localhost:3001/api/notes',{
                    withCredentials:true,
                });
                setNotes(response.data)
                if(response.data.length>0 && response.data[0].user){
                    setUsername(response.data[0].user.username);
                }
                else{
                    await fetchProfile();
                }
            }
            catch (error) {
                console.error('Error fetching notes:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login'); // Redirect to login if unauthorized
                }
            }
        };
        const fetchProfile=async()=>{
            try{
                const response=await axios.get('http://localhost:3001/user/profile',{
                    withCredentials:true,
                });
                setUsername(response.data.username);
            }catch(error){
                console.error('Error fetching profile:', error);
            }
        }
        fetchNotes();
    }, [navigate]);

    const handleEdit=(id)=>{
     navigate(`/update/${id}`);
     
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/notes/${id}`, {
                withCredentials: true, // Include cookies in the request
            });
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleCreate=(e)=>{
     e.preventDefault();
     navigate(`/create`);
    }

    const handleLogout= async() =>{
        try{
            await axios.post('http://localhost:3001/user/logout', {}, { withCredentials: true,});
            navigate('/login'); 
        }
        catch (error) {
            console.error('Error logging out:', error);
        }
    }

    return (
        <div className="min-h-screen bg-[var(--bg-color)]">
            {/* Header */}
            <header className="bg-[var(--header-bg-color)] text-[var(--text-color)] py-4 shadow-md">
                <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
                    <h1 className="text-xl font-bold">My Own NoteBook</h1>
                    <div className="flex items-center space-x-4">
                        {username && <span className="text-sm">Hello, {username}</span>}
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                        <button
                        onClick={toggleTheme}
                        className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300"
                        >
                        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Notes Section */}
            <div className="max-w-4xl mx-auto p-6">
    <div
        className="shadow-lg rounded-lg p-6"
        style={{
            backgroundColor: 'var(--bg-color)', // Dynamic background color
            color: 'var(--text-color)', // Dynamic text color
        }}
    >
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>
                Notes
            </h2>
            <button
                onClick={handleCreate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
                Add Note
            </button>
        </div>
        {notes.length > 0 ? (
            <ul className="space-y-4">
                {notes.map((note) => (
                    <li
                        key={note._id}
                        className="border rounded-md shadow-sm p-4"
                        style={{
                            backgroundColor: 'var(--bg-color)', // Card background
                            borderColor: 'var(--text-color)', // Dynamic border color
                            color: 'var(--text-color)', // Dynamic text color
                        }}
                    >
                        <h3
                            className="text-lg font-semibold"
                            style={{ color: 'var(--text-color)' }}
                        >
                            {note.title}
                        </h3>
                        <p className="mt-2" style={{ color: 'var(--text-color)' }}>
                            {note.content}
                        </p>
                        <small
                            className="block mt-2"
                            style={{ color: 'var(--text-color)' }}
                        >
                            {new Date(note.timestamp).toLocaleString()}
                        </small>
                        <div className="flex justify-end mt-4 space-x-4">
                            <button
                                onClick={() => handleEdit(note._id)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(note._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-gray-600" style={{ color: 'var(--text-color)' }}>
                No notes available. Start by adding a new note!
            </p>
        )}
    </div>
</div>
</div>
    );
}

export default NotesList;
