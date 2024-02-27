import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Message from './Message';

import HoangAnh from './about/hoanganh'; 
import Dustin from './about/dustin';
import Jeawan from './about/jeawan';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Message />} />
                <Route path="/about/hoanganh" element={<HoangAnh />} />
                <Route path="/about/dustin" element={<Dustin />} />
                <Route path="/about/jeawan" element={<Jeawan />} />
            </Routes>
        </Router>
    );
    
}

export default App;
