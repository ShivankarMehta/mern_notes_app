import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreateNote(){
 const [title, setTitle]= useState('');
 const [content, setContent]= useState('');
 const [color, setColor]= useState("#000000");
 const navigate=useNavigate();
 
const handleSubmit=(e)=>{
    e.preventDefault();
  

    axios
    .post('https://notes-app-backend-5695.onrender.com//api/notes', {title,content,color},{
        withCredentials:true,
    })
    .then((response)=>{
        alert('Note created successfully');
        setTitle('');
        setContent('');
        setColor('#000000')
        navigate(`/noteslist`);
    })
    .catch((error)=>{
        console.error('Error creating note:', error);
    })
}


return (
    <div className="min-h-screen bg-[var(--bg-color)] p-6">
        <h1 class="text-5xl font-extrabold text-center text-[var(--text-color)] bg-gradient-to-r from-blue-400 via-blue-400 to-pink-700 text-transparent bg-clip-text py-8">
        Create A Note</h1>
        <div className="max-w-2xl mx-auto bg-[var(--header-bg-color)] text-[var(--text-color)] shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Note</h2>
        <form onSubmit={handleSubmit} className="border border-gray-300 rounded-md shadow-sm p-4 bg-gray=50">
            <div className="mt-2 flex flex-col gap-2">
                <label className="text-xl font-bold">Title :</label>
                <input
                type="text"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                className="border border-gray-200 rounded-md shadow-sm p-4 w-[100%]"
                required/>
            </div>
            <div className="mt-2 flex flex-col gap-2">
          <label className="text-xl font-bold mr-4">Content :</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-200 rounded-md shadow-sm p-4 w-[100%] "
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
        className="mt-4 bg-green-500 text-white px-3 py-3 rounded-md hover:bg-yellow-600 transition"
        >Create Note</button>
        </form>
    </div>
    </div>
)

}

export default CreateNote;