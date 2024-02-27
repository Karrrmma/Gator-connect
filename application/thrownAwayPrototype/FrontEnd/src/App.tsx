import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Message from './Message';

<<<<<<< HEAD
import HoangAnh from './about/hoanganh';
import Fabian from './about/fabiweiland';

=======
import HoangAnh from './about/hoanganh'; 
import Dustin from './about/dustin';
import Jeawan from './about/jeawan';
>>>>>>> 44151fe5e49862e876b8c5bfb051a14b416f4c60

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Message />} />
                <Route path="/about/hoanganh" element={<HoangAnh />} />
<<<<<<< HEAD
                <Route path="/about/fabiweiland" element={<Fabian />} />
=======
                <Route path="/about/dustin" element={<Dustin />} />
                <Route path="/about/jeawan" element={<Jeawan />} />
>>>>>>> 44151fe5e49862e876b8c5bfb051a14b416f4c60
            </Routes>
        </Router>
    );
    
}

export default App;
