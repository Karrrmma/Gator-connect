import './App.css';
// refactor into folders later
import Nav from './components/Nav';  
import Notification from './components/Notification';
import Post from './components/Post'; // placeholder
import { Explore, Profile, Chat, Login, Register, Start, NewPost } from './pages';
import useToken from './hooks/useToken';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatWindow from './pages/Chat/chatWindow';
import PubChat from './pages/Chat/pubChat';
import Channel from './pages/Chat/channel';




function App() {
  const {token, setToken} = useToken();
  // const {setToken} = useToken();
  
  if (!token) {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
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
            <Route path="/notification" element={<Notification />}/>
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chatWindow/:name" element={<ChatWindow />} />
            <Route path="/pubChat" element={<PubChat />} />
            <Route path="/channel/:channel_names" element={<Channel />} />
            <Route path="/newpost" element={<NewPost />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
