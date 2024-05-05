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



const Channel = () => {
  // get current channel
  const {channel_names} = useParams();



  const [publicMessages, setPublicMessages] = useState([]);
  const [fetched, setFetched] = useState(false);

  //--fetching existing public messages from DB
  useEffect(() => {
    const fetchPublicMessages = async () => {
      const responseFetch = await fetch(`/api/chat/getPublicMessages/${channel_names}`);
      if(!responseFetch){
        console.error('Failed to fetch public messages!');
        return;
      }

      try{
        if (!responseFetch.ok) {
          throw new Error(`HTTP error! status: ${responseFetch.status}`);
        }
        const returnFetch = await responseFetch.json();
        console.log("Fetched public messages:", returnFetch);
        return returnFetch;
      }catch (error){
        console.error('Failed to fetch public messages!: ', error);
      }
    }

    fetchPublicMessages().then(res => {
      setPublicMessages(res);
    }).catch(error => {
      console.error(error); // Handle errors if the Promise is rejected
    });
    setFetched(true);
  }, [fetched]);

  //---end fetching


  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    const senderID = getCurrentUserId()
    sendMessageToDB(senderID, inputMessage.trim(), channel_names);

    if(inputMessage.trim() !== ''){
      setMessages([...messages, {text: inputMessage}]);
      setInputMessage('');
    }
  };

  //--sending to DB
  const sendMessageToDB = async (senderID, contentMessage, channel_names) => {
    try{
      const response = await fetch(`/api/chat/sendPublicMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            sender_id: senderID,
            message_content: contentMessage,
            message_type: channel_names,
        }),
      });
//      const data = await response.json();
      if (response.ok) {
          console.log("Send Message successfully to BE API!");
      } else {
          alert("Failed sending message to BE API!")
      }

    }catch(error){
      console.log('****error sending message to Backend API: ', error);
    }
  }

  //--end sending to DB
    

    return (
      <div className="container-fluid" >
        <div className="row justify-content-center "  >
           <div className="" style={{ marginTop: '20px' }}>
           <h1 style={{fontWeight: 'bold', color: 'white', fontSize: '2.0rem', marginBottom: '25px'}} className=" ">PUBLIC CHAT</h1>
           <Head/>
            <div className="chat-container h-75 border-0 " style={{ background:'black', width: '500px', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}}>
                
                <div className="card-body" style={{ backgroundColor: 'black', overflowY: 'auto', height: '478px'}}>
                  {publicMessages.map((pub_message, index) =>
                  <div>
                    <p style={{ color:'grey', maxWidth:'50%', fontSize:'10px', marginLeft: pub_message.sender_id === getCurrentUserId() ? 'auto' : '0',
                     border:'#252525', textAlign: 'center', marginBottom:'auto'}}>
                      {pub_message.message_time}
                    </p>

                    <SenderName userID={pub_message.sender_id}/>

                    <p className='rounded-pill' key={index} style={{ backgroundColor: '#252525', padding:'10px', color:'white',
                    maxWidth:'50%', marginLeft: pub_message.sender_id === getCurrentUserId() ? 'auto' : '0', fontSize:'17px', border:'#252525', marginBottom:'5px', 
                    textAlign: pub_message.sender_id === getCurrentUserId() ? 'right' : 'left'}}>
                      {pub_message.message_content}
                    </p>
                  </div>
                  )}

                  {messages.map((message, index) =>
                    <p className='rounded-pill' key={index} style={{ backgroundColor: '#252525', padding:'10px', color:'white',
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
     <div style={{background: 'black', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>     
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
    <div className="chat-container border-0" style={{background: 'black', justifyContent: 'center'}}>
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