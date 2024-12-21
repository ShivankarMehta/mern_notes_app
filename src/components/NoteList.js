import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

function NotesList() {
    const [notes, setNotes] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:3001/api/notes') // Your backend URL for fetching notes
            .then((response) => {
                setNotes(response.data); // Set notes from the response
            })
            .catch((error) => {
                console.error('Error Fetching notes:', error);
            });
    }, []);

    const handleEdit=(id)=>{
     navigate(`/update/${id}`);
     
    }

    const handleDelete=(e)=>{
        e.preventDefault();
    }

    const handleCreate=(e)=>{
     e.preventDefault();
     navigate(`/create`);
    }

    return (
        <div>
            <h2>Notes</h2>
            <button onClick={handleCreate}>Add</button>
            <ul>
                {notes.map((note) => (
                    <li key={note._id}>
                        <h3>{note.title}</h3> {/* Display note title */}
                        <p>{note.content}</p> {/* Display note content */}
                        <small>{new Date(note.timestamp).toLocaleString()}</small> {/* Display timestamp */}
                        <button onClick={() => handleEdit(note._id)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NotesList;
