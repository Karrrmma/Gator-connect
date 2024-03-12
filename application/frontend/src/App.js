import './App.css';
import Nav from './components/Nav';
import NewPost from './components/NewPost';
import Post from './components/Post';
import Explore from './components/Explore';
import Profile from './components/Profile';
import Chat from './components/Chat';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />
          <Routes>
            <Route path="/" element={<Post />}/>
            <Route path="/new" element={<NewPost />}/>
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
