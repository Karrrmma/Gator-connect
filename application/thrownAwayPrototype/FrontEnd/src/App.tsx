import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Message from './Message';

import HoangAnh from './about/hoanganh';
import Fabian from './about/fabiweiland';
import Dustin from './about/dustin';
import Jeawan from './about/jeawan';
import Ralph from './about/ralph';
import Karma from './about/karma';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Message />} />
                <Route path="/about/hoanganh" element={<HoangAnh />} />
                <Route path="/about/fabiweiland" element={<Fabian />} />
                <Route path="/about/dustin" element={<Dustin />} />
                <Route path="/about/jeawan" element={<Jeawan />} />
                <Route path="/about/ralph" element={<Ralph />} />
                <Route path="/about/karma" element={<Karma />} />

            </Routes>
        </Router>
    );
}

export default App;
