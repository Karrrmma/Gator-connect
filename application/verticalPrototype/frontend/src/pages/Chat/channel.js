import React from 'react';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ImBooks } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";
import { SlSpeech } from "react-icons/sl";
import { FaFootballBall } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";

import { useState } from "react";




const Channel = () => {

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if(inputMessage.trim() !== ''){
      setMessages([...messages, {text: inputMessage, sender: 'user'}]);
      setInputMessage('');
    }
  };
    


    return (
      <div className="container-fluid" >
        <div className="row justify-content-center "  >
           <div className="" style={{ marginTop: '20px' }}>
           <h5 style={{fontWeight: 'bold', color: 'white', fontSize: '35px'}} className=" ">PUBLIC CHAT</h5>
           <Head/>
            <div className="card h-75 border-0 " style={{ background:'black', width: '500px'}}>
                
                <div className="card-body" style={{ backgroundColor: 'black', overflowY: 'auto', height: '378px'}}>
                  {messages.map((message, index) =>
                    <p className='rounded-pill' key={index} style={{ backgroundColor: '#252525', padding:'10px', color:'white',
                    maxWidth:'50%', marginLeft: 'auto', fontSize:'20px', border:'#252525', marginBottom:'5px', 
                    textAlign: message.sender === 'user' ? 'right' : 'left'}}>
                      {message.text}
                    </p>
                  )}
                </div>
                {/*---BOTTOM---*/}
                <Bottom inputMessage={inputMessage} setInputMessage={setInputMessage} sendMessage={sendMessage}/>
            </div>
            </div>
        </div>
      </div>
    );
};



  function Head(){
    const {channel_names} = useParams()

    const selectElement = (name) => {
      switch (name) {
        case 'General':
          return <SlSpeech style={{marginLeft:'10px', marginRight: '10px', fontSize: '48px', color: '#c15757'}}></SlSpeech>;
        case 'Find Roomates':
          return <FaUserFriends style={{marginLeft:'10px', marginRight: '10px', fontSize: '50px', color: '#c15757'}}></FaUserFriends>;
        case 'Study Help':
          return <ImBooks style={{marginLeft:'10px', marginRight: '10px', fontSize: '50px', color: '#c15757'}}></ImBooks>;
        case 'Campus Events':
          return <GiCampingTent style={{marginLeft:'10px', marginRight: '10px', fontSize: '50px', color: '#c15757'}}></GiCampingTent>;
        case 'Campus Clubs':
          return <FaFootballBall style={{marginLeft:'10px', marginRight: '10px', fontSize: '46px', color: '#c15757'}}></FaFootballBall>;
        default:
          return <p>no image for new channel{name}.</p>;
      }
    };
  

    return(
     <div style={{background: 'black'}}>      
      <div class="d-flex align-items-center" style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right' }}>
        {selectElement(channel_names)}
        <p style={{ color: 'white', fontSize: '25px'}}>{channel_names}</p>
        <Link to='/pubChat' className='text-decoration-none' style={{fontWeight: 'bold', color: '#252525', fontSize: '35px', display: 'inline-block', marginLeft:'auto' }}>X</Link>
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
    <div className="card border-0" style={{background: 'black', justifyContent: 'center'}}>
        <div className="card-body d-flex align-items-center" style={{background: 'black', justifyContent: 'center'}}>
          <input type="text rounded-pill" className="form-control" placeholder="Type here ..." aria-label="Recipient's username" 
            aria-describedby="basic-addon2" value={inputMessage} onChange={handleChange} onKeyPress={handleKeyPress}
            style={{color:'white', backgroundColor: '#252525', width:'400px', height: '50px', border:'#252525', marginRight: '10px'}}>

            </input>
          <Button variant="primary" style={{background: '#252525', color:'white', height: '50px', width: '50px', border:'#252525'}} onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} /> 
          </Button>           
        </div>
    </div>
  )
  
  }
  
  export default Channel;