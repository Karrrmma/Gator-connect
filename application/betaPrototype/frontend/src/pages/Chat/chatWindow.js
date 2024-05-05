import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { useState } from "react";



const ChatWindow = () => {

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
    }
  };

  return (
    <div className="container-fluid" >
      <div className="row justify-content-center "  >
        <div className="" style={{ marginTop: '20px' }}>
        <h1 style={{fontWeight: 'bold', color: 'white', fontSize: '2.0rem', marginBottom: '25px'}} className=" ">PRIVATE CHAT</h1>
          <Head />
          <div className="chat-container h-75 border-0 " style={{ background: 'black', width: '500px', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}}>

            <div className="card-body" style={{ backgroundColor: 'black', overflowY: 'auto', height: '478px' }}>
              {messages.map((message, index) =>
                <p className='rounded-pill' key={index} style={{
                  backgroundColor: '#252525', padding: '10px', color: 'white',
                  maxWidth: '50%', marginLeft: 'auto', fontSize: '20px', border: '#252525', marginBottom: '5px',
                  textAlign: message.sender === 'user' ? 'right' : 'left'
                }}>
                  {message.text}
                </p>
              )}
            </div>
            {/*---BOTTOM---*/}
            <Bottom inputMessage={inputMessage} setInputMessage={setInputMessage} sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

function Head() {
  const { name } = useParams()

  return (
    <div style={{ background: 'black', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
      <div class="d-flex align-items-center" style={{ width: '100%', padding: '20px', textAlign: 'right' }}>
        <div className="avatar" style={{fontSize: '30px'}}>🐳</div>
        <p style={{ color: 'white', fontSize: '25px', marginLeft: '5px' }}>{name}</p>
        <Link to='/chat' className='text-decoration-none' style={{fontWeight: 'bold', color: 'gray', fontSize: '30px', display: 'inline-block', marginLeft:'auto'}}>X</Link>
      </div>
    </div>
  );
}

function Bottom({ inputMessage, setInputMessage, sendMessage }) {

  const handleChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };


  return (
    <div className="chat-container border-0" style={{ background: 'black', justifyContent: 'center' }}>
      <div className="card-body d-flex align-items-center" style={{ background: 'black', justifyContent: 'center' }}>
        <input type="text rounded-pill" className="form-control" placeholder="Enter your message here ..." aria-label="Recipient's username"
          aria-describedby="basic-addon2" value={inputMessage} onChange={handleChange} onKeyPress={handleKeyPress}
          style={{ color: 'white', backgroundColor: '#252525', width: '400px', height: '50px', border: '#656565', marginRight: '10px' }}>
        </input>

        <Button variant="primary" style={{ background: '#252525', color: 'white', height: '50px', width: '50px', border: '#252525' }} onClick={sendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </div>
    </div>
  )

}

export default ChatWindow;