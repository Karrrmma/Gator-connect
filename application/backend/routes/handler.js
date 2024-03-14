const express = require('express');
const router = express.Router();

// TODO: make this communiate with database and grab a post
router.get('/testpost', (req, res) => {
    const str = [{
        username: 'Test User',
        content: 'This is a test post!'
    }]
    res.end(JSON.stringify(str));
});

router.get('/login', (req, res) => {  
    const str = [{
        username: 'test',
        password: 'password'
    }]
    res.end(JSON.stringify(str));
});

router.post('/newpost', (req, res) => {
    res.end('To be implemented');
});

module.exports = router;