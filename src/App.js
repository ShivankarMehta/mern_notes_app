import { BrowserRouter as Router, Route, Routes ,useLocation} from 'react-router-dom';
import NotesList from './components/NoteList';
import CreateNote from "./components/CreateNote";
import UpdateNote from './components/UpdateNote';
import Signup from './components/signup';
import Login from './components/Login';
import AuthLayout from './Layout/AuthLayout';
// import UpdateNote from "./components/UpdateNote";
function App() {
  return (
    <Router>
      {/* <ConditionalHeader />  */}
      <Routes>
      <Route path="/noteslist" element={<NotesList />} />
      <Route path="/create" element={<CreateNote />} />
      <Route path="/update/:id" element={<UpdateNote />} />
      <Route element={<AuthLayout/>}>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />  {/* Route for UpdateNote */}
      </Route>
      </Routes>
    </Router>
  );
}


// function ConditionHeader(){
//   const location=useLocation();
//   const showHeaderPaths=['/', '/login'];

//   return showHeaderPaths.includes(location.pathname) ? <Header/> : null;
// }
export default App;

