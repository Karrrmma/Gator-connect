import './App.css';
import Nav from './components/Nav';  
import Notification from './components/Notification';
import Post from './components/Post';

// Start Pages
import { 
  Login, Register, Start, TOS, ForgotPassword, About 
} from './pages';

// Explore related pages
import { 
  FoodVendor, Transportation, VendorDetail 
} from './pages';

// NavBar pages
import { 
  Explore, Profile, Chat,Event
} from './pages';

// Chat related pages
import { 
  ChatWindow, PubChat, Channel 
} from './pages';

import useToken from './hooks/useToken';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const { token, setToken } = useToken();
  // If the user is not logged in, restrict access to the app
  if (!token) {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tos" element={<TOS />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<About />} />
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
              <Route path="/explore/foodVendor" element={<FoodVendor />} /> 
                <Route path="/explore/foodVendor/:name" element={<VendorDetail />} />  
              <Route path="/explore/transportation" element={<Transportation />} /> 
              <Route path="/explore/event" element={<Event />} /> 

            <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:userId" element={<Profile />} />

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




