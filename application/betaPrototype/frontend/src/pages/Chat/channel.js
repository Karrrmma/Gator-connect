import React, { useEffect } from 'react';
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
import { getCurrentUserId } from '../../utils/decodeData';
import { queryData } from '../../utils/queryUser';
import { getPublicMessages, sendPublicMessage } from './../../services/Chat/chatService';



const Channel = () => {
  // get current channel
  const {channel_names} = useParams();



  const [publicMessages, setPublicMessages] = useState([]);
  const [fetched, setFetched] = useState(false);

  //--fetching existing public messages from DB
  useEffect(() => {
    const fetchPublicMessages = async () => {
      try {
          const data = await getPublicMessages(channel_names);
          console.log("Fetched public messages:", data);
          return data;
          // return await getPublicMessages(channel_names);
      } catch (error) {
          console.error('Failed to fetch public messages!');
      }
    }

    fetchPublicMessages().then(res => {
      setPublicMessages(res);
    }).catch(error => {
      console.error(error); // Handle errors if the Promise is rejected
    });
    setFetched(true);
  }, [fetched, channel_names]);

  //---end fetching


  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if(inputMessage.trim() !== ''){
      const senderID = getCurrentUserId()
      sendMessageToDB(senderID, inputMessage.trim(), channel_names);

      setMessages([...messages, {text: inputMessage}]);
      setInputMessage('');
    }
  };

  //--sending to DB
  const sendMessageToDB = async (senderID, contentMessage, channel_names) => {
    try{
      await sendPublicMessage({
        sender_id: senderID,
        message_content: contentMessage,
        message_type: channel_names,
      });

      console.log("Send Message successfully to BE API!");
    }catch(error){
      alert("Failed sending message to BE API!")
      console.log('****error sending message to Backend API: ', error);
    }
  }

  //--end sending to DB
    

    return (
      <div className="container-fluid" >
           <div className="" style={{ marginTop: '20px' }}>
           <h1 style={{fontWeight: 'bold', color: 'white', fontSize: '2.0rem', marginBottom: '25px'}} className=" ">PUBLIC CHAT</h1>
           <Head/>
            <div className="chat-container" style={{ borderTopLeftRadius: '0px', borderTopRightRadius: '0px'}}>
                
                <div className="chat-body" style={{ backgroundColor: 'black', overflowY: 'auto', height: '478px'}}>
                  {publicMessages.map((pub_message, index) =>
                  <div>
                    <p style={{ color:'grey', maxWidth:'50%', fontSize:'10px', marginLeft: pub_message.sender_id === getCurrentUserId() ? 'auto' : '0',
                     border:'#252525', textAlign: 'center', marginBottom:'auto'}}>
                      {pub_message.message_time}
                    </p>

                    <SenderName userID={pub_message.sender_id}/>

                    <p className='rounded' key={index} style={{ backgroundColor: '#252525', padding:'10px', color:'white',
                    maxWidth:'50%', marginLeft: pub_message.sender_id === getCurrentUserId() ? 'auto' : '0', fontSize:'17px', border:'#252525', marginBottom:'5px', 
                    textAlign: pub_message.sender_id === getCurrentUserId() ? 'right' : 'left'}}>
                      {pub_message.message_content}
                    </p>
                  </div>
                  )}

                  {messages.map((message, index) =>
                    <p className='rounded' key={index} style={{ backgroundColor: '#252525', padding:'10px', color:'white',
                    maxWidth:'50%', marginLeft: 'auto', fontSize:'17px', border:'#252525', marginBottom:'5px', 
                    textAlign: 'right'}}>
                      {message.text}
                    </p>
                  )}
                </div>
                {/*---BOTTOM---*/}
                <Bottom inputMessage={inputMessage} setInputMessage={setInputMessage} sendMessage={sendMessage} />
            </div>
        </div>
      </div>
    );
};

  function SenderName({userID}){
    const [userData, setUserData] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(()=> {
      queryData(userID).then(res => {
        console.log(res.fullName);
        setUserData(res);
        setFetched(true);
      }).catch(error => {
        console.error(error); // Handle errors if the Promise is rejected
      });
    },[fetched]);
    
    return(
      <p style={{padding:'1px', color:'white', maxWidth:'50%', marginLeft: userID === getCurrentUserId() ? 'auto' : '0',
       fontSize:'10px', border:'#252525', marginBottom:'auto', textAlign: userID === getCurrentUserId() ? 'right' : 'left'}}>
        {userData.fullName}
      </p>
    );
  }


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
      <div className="head-chat">  
      <div class="d-flex align-items-center" style={{ width: '100%', padding: '20px', textAlign: 'right' }}>
        {selectElement(channel_names)}
        <p style={{ color: 'white', fontSize: '25px', marginLeft: '5px' }}>{channel_names}</p>
        <Link to='/pubChat' className='text-decoration-none' style={{fontWeight: 'bold', color: 'gray', fontSize: '30px', display: 'inline-block', marginLeft:'auto'}}>X</Link>
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
    <div className="w-100">
        <div className="chat-body d-flex align-items-center" style={{background: 'black', justifyContent: 'center'}}>
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