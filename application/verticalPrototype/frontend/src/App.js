import './App.css';
import Nav from './components/Nav';  
import Notification from './components/Notification';
import Post from './components/Post';
import { Explore, Profile, Chat, Login, Register, Start, NewPost, TOS } from './pages';
// -------------------------------------------------------------------------
// Route for directing foodvendor, transportation and event
// If there is another way to optimize the route, please edit it !!
import FoodVendor from './pages/Explore/FoodVendor/FoodVendor';
import Transportation from './pages/Explore/Transportation/Transportation';
import Event from './pages/Explore/Event/Event';
import VendorDetail from './pages/Explore/FoodVendor/VendorDetail'; // This will be the component for vendor details
import ChatWindow from './pages/Chat/chatWindow';
import PubChat from './pages/Chat/pubChat';
import Channel from './pages/Chat/channel';


// --------------------------------------------------------------------------
import useToken from './hooks/useToken';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




function App() {
  const { token, setToken} = useToken();

  if (!token) {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register setToken={setToken}/>} />
            <Route path="/tos" element={<TOS />} />
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
            <Route path="/home" element={<Post />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/explore" element={<Explore />} /> 
            <Route path="/newPost" element={<NewPost />} />
              <Route path="/explore/foodVendor" element={<FoodVendor />} /> 
                <Route path="/explore/foodVendor/:name" element={<VendorDetail />} />  
              <Route path="/explore/transportation" element={<Transportation />} /> 
              <Route path="/explore/event" element={<Event />} /> 
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />

            <Route path="/chatWindow/:name" element={<ChatWindow />} />
            <Route path="/pubChat" element={<PubChat />} />
            <Route path="/channel/:channel_names" element={<Channel />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;




