import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreateNote(){
 const [title, setTitle]= useState('');
 const [content, setContent]= useState('');
 const navigate=useNavigate();
 
const handleSubmit=(e)=>{
    e.preventDefault();
  

    axios
    .post('http://localhost:3001/api/notes', {title,content})
    .then((response)=>{
        alert('Note created successfully');
        setTitle('');
        setContent('');
        navigate(`/`);
    })
    .catch((error)=>{
        console.error('Error creating note:', error);
    })
}


return (
    <div>
        <h2>Create Note</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                type="text"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                required/>
            </div>
            <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Create Note</button>
        </form>
    </div>
)

}

export default CreateNote;