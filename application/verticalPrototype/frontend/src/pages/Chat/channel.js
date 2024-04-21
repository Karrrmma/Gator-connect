import React from 'react';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { useState } from "react";




const Channel = () => {

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if(inputMessage.trim() !== ' '){
      setMessages([...messages, {text: inputMessage, sender: 'user'}]);
      setInputMessage('');
    }
  };
    


    return (
      <div className="container-fluid">
        <div className="row justify-content-center" >
           <div className="col-md-6">
            <div className="card h-75 border-0">
                <Head/>
                <div className="card-body" style={{ overflowY: 'auto', height: '535px'}}>
              


                    {messages.map((message, index) =>
                      <p key={index} style={{ backgroundColor: '#dad9d2', padding:'10px', color:'black',
                      maxWidth:'50%', marginLeft: 'auto', fontSize:'20px', border:'grey', marginBottom:'5px', 
                      textAlign: message.sender === 'user' ? 'right' : 'left'}}>
                        {message.text}
                      </p>
                    )}

                    {/* {postedText &&(
                      <div style={{ marginLeft: 'auto', backgroundColor: 'grey', width: 'auto', height: '30px' }}>
                        {postedText}
                      </div>
                    )} */}




                     {/* <p style={{ color: 'grey', fontSize: '30px'}}>{postedText}</p> */} 
                  
                    {/* <p style={{ color: 'grey', fontSize: '30px'}}>Lorem Ipsum</p> */}
                </div>


                

                {/*---BOTTOM---*/}
                <Bottom inputMessage={inputMessage} setInputMessage={setInputMessage} sendMessage={sendMessage}/>



                <div className='card border-0'>
                    <p>doesn't matter</p>
                </div>
            </div>
           </div>
        </div>
      </div>
    );
};



  function Head(){
    const {channel_names} = useParams()

    return(
    <div className="card" style={{backgroundColor: '#a28b39'}}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
        <Link to='/pubChat' class="bi bi-arrow-left-circle" style={{ color: 'white', fontSize: '30px'}}></Link>
        <h5 style={{color: 'white', fontSize: '50px'}} className="card-title mb-0">Public Chat</h5>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
        <Link to='/home' className="bi bi-x-circle" style={{color: 'white', fontSize: '30px'}}></Link>
      </div>
      <div className='card-body d-flex justify-content-between align-items-center'>
        <p style={{ color: 'white', fontSize: '30px'}}>{channel_names}</p>
      </div>
    </div>
    );
  }


  function Bottom({inputMessage, setInputMessage, sendMessage}){

    const handleChange = (event) => {
      setInputMessage(event.target.value);
    };
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter'){
        sendMessage();
      }
    };


  return(
    <div className="card border-0">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>sdfsd</div>
          <input type="text" className="form-control" style={{backgroundColor: '#dad9d2', height: '50px'}} 
            placeholder="Type here ..." aria-label="Recipient's username" aria-describedby="basic-addon2" 
            value={inputMessage} onChange={handleChange} onKeyPress={handleKeyPress}></input>
          <Button variant="primary" style={{background: '#dad9d2', color:'white', height: '50px', width: '50px'}} onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} /> 
          </Button>           
          <div>sdfsd</div>
        </div>
    </div>
  )
  
  }
  
  export default Channel;