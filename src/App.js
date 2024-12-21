import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotesList from './components/NoteList';
import CreateNote from "./components/CreateNote";
import UpdateNote from './components/UpdateNote';


// import UpdateNote from "./components/UpdateNote";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotesList />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/update/:id" element={<UpdateNote />} />  {/* Route for UpdateNote */}
      </Routes>
    </Router>
  );
}

export default App;
