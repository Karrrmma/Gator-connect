import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Dog from '../../assets/images/art10.jpg';
import Cat from '../../assets/images/art5.jpg';
import Placeholder from '../../assets/images/placeholder_pfp.png';import Button from 'react-bootstrap/Button';
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
          <h5 style={{fontWeight: 'bold', color: 'white', fontSize: '35px' }} className=" ">PRIVATE CHAT</h5>
          <Head />
          <div className="card h-75 border-0 " style={{ background: 'black', width: '500px' }}>

            <div className="card-body" style={{ backgroundColor: 'black', overflowY: 'auto', height: '378px' }}>
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

  const selectElement = (name) => {
    switch (name) {
      case 'Fabian Weiland':
        return <img src={Cat} class="rounded-circle" alt="placeholder pfp" style={{ width: 50, height: 50, display: 'inline-block', marginLeft: '10px', marginRight: '10px' }}></img>;
      case 'Jose Ortiz':
        return <img src={Dog} class="rounded-circle" alt="placeholder pfp" style={{ width: 50, height: 50, display: 'inline-block', marginLeft: '10px', marginRight: '10px' }}></img>;
      case 'Marco Lorenz':
        return <img src={Placeholder} class="rounded-circle" alt="placeholder pfp" style={{ width: 50, height: 50, display: 'inline-block', marginLeft: '10px', marginRight: '10px' }}></img>;
      default:
        return <p>user is not found{name}.</p>;
    }
  };

  return (
    <div style={{ background: 'black' }}>
      <div class="d-flex align-items-center" style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right'}}>
        {selectElement(name)}
        <p style={{ color: 'white', fontSize: '20px' }}>{name}</p>
        <Link to='/chat' className='text-decoration-none' style={{fontWeight: 'bold', color: '#252525', fontSize: '30px', display: 'inline-block', marginLeft:'auto'}}>X</Link>
      </div>
    </div>
  );
}
/* , marginLeft: '230px', marginRight: '10px'  */

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
    <div className="card border-0" style={{ background: 'black', justifyContent: 'center' }}>
      <div className="card-body d-flex align-items-center" style={{ background: 'black', justifyContent: 'center' }}>
        <input type="text rounded-pill" className="form-control" placeholder="Type here ..." aria-label="Recipient's username"
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