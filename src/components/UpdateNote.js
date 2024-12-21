import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateNote() {
    const { id } = useParams(); // Get the note ID from the URL
    const navigate = useNavigate(); // Used to navigate after the update

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Fetch the note data by ID when the component is mounted or the ID changes
    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/notes/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setContent(response.data.content);
            })
            .catch((error) => {
                console.error('Error fetching note:', error);
            });
    }, [id]);

    // Handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission (to stop page reload)

        axios
            .put(`http://localhost:3001/api/notes/${id}`, { title, content })
            .then((response) => {
                alert('Note Updated successfully');
                navigate('/'); // Navigate back to the notes list page after update
            })
            .catch((error) => {
                console.error('Error updating note:', error);
            });
    };

    return (
        <div>
            <h2>Update Note</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Update Note</button>
            </form>
        </div>
    );
}

export default UpdateNote;
