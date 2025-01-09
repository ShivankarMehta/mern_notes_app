import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const API_USER = process.env.REACT_APP_API_USER;
function UpdateNote() {
    const { id } = useParams(); // Get the note ID from the URL
    const navigate = useNavigate(); // Used to navigate after the update
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [color,setColor]=useState('#000000');

    // Fetch the note data by ID when the component is mounted or the ID changes
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`${API_USER}/api/notes/${id}`, {
                    withCredentials: true,
                });
                // Set the note data into state
                setTitle(response.data.title || '');
                setContent(response.data.content || '');
                setColor(response.data.color || '');
            } catch (error) {
                console.error('Error fetching note:', error);
            }
        };

        fetchNote();
    }, [id]);

    // Handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission (to stop page reload)

        axios
            .put(`${API_USER}/api/notes/${id}`, { title, content, color }, {
                withCredentials:true,
            })
            .then((response) => {
                alert('Note Updated successfully');
                navigate('/noteslist'); // Navigate back to the notes list page after update
            })
            .catch((error) => {
                console.error('Error updating note:', error);
            });
    };

    return (
        <div className="min-h-screen bg-[var(-bg-color)] p-6">
            <h1 class="text-5xl font-extrabold text-center text-gray-800 bg-gradient-to-r from-blue-400 via-blue-400 to-pink-700 text-transparent bg-clip-text py-8">
            Update A Note</h1>
             <div className="max-w-2xl mx-auto bg-[var(--header-bg-color)] text-[var(--text-color)] shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Note</h2>
            <form onSubmit={handleSubmit} className="border border-gray-300 rounded-md shadow-sm p-4 bg-gray=50">
                <div className="mt-2 flex flex-col gap-2">
                    <label className="text-xl font-bold">Title :</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-200 rounded-md shadow-sm p-4 w-[100%]"
                        required
                    />
                </div>
                <div>
                    <label className="text-xl font-bold">Content :</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="border border-gray-200 rounded-md shadow-sm p-4 w-[100%]"
                        required
                    ></textarea>
                </div>
                <div className="mt-2 flex flex-col gap-2">
            <label className="text-xl font-bold">Color:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)} // Update color state
              className="w-16 h-10 border-none"
            />
          </div>
                <button type="submit"
                className="mt-4 bg-blue-500 text-white px-3 py-3 rounded-md hover:bg-yellow-600 transition"
                >Update Note</button>
            </form>
            </div>
        </div>
    );
}

export default UpdateNote;
