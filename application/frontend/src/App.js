import './App.css';
// refactor into folders later
import Nav from './components/Nav';  
import NewPost from './components/NewPost';
import Post from './components/Post';
import Explore from './components/Explore';
import Profile from './components/Profile';
import Chat from './components/Chat';
import Login from './components/Login';
import SignUp from './components/SignUp';
import useToken from './components/useToken';
import Start from './components/Start'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const {token, setToken} = useToken();

  if (!token) {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </div>
    ); 
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />
          <Routes>
            <Route path="/home" element={<Post />}/>
            <Route path="/new" element={<NewPost />}/>
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} /> */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
