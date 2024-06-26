/* HEADER
- This file belongs to the overall chat application.
- This file opens the private chat with a friend.
- Users can read and write messages inside this private chat
-*/


import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { useState } from "react";
import { useEffect } from "react";
import { getCurrentUserId } from '../../utils/decodeData';
import { queryData } from "../../services/User/UserService";
import { getPrivateMessages, sendPrivateMessage } from '../../services/Chat/ChatService';
import { getUserInfo } from '../../services/User/UserService';





const ChatWindow = () => {

  const { name } = useParams()




  const [privateMessages, setPrivateMessages] = useState([]);
  const [fetched, setFetched] = useState(false);

  //--fetching private messages from DB
  useEffect(() => {
    const fetchPrivateMessages = async (senderID, name) => {
      // Constructing query parameters
      const params = new URLSearchParams();
      params.append('senderID', senderID);
      params.append('name', name);


      try{
          const returnFetch = await getPrivateMessages(params.toString());
          console.log("Fetched private messages:", returnFetch);
          return returnFetch;
      } catch (error){
          console.error('Failed to fetch private messages!: ', error);
      }
    }

    const senderID = getCurrentUserId();
    fetchPrivateMessages(senderID, name).then(res => {
      setPrivateMessages(res);
    }).catch(error => {
      console.error(error); // Handle errors if the Promise is rejected
    });
    setFetched(true);
  }, [fetched]);

  //---end fetching




  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      const senderID = getCurrentUserId()
      sendMessageToDB(senderID, inputMessage.trim(), name);

      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
    }
  };


  //--sending to DB
  const sendMessageToDB = async (senderID, contentMessage, name) => {
    try{
      await sendPrivateMessage({
        sender_id: senderID,
        message_content: contentMessage,
        receiver_name: name,
    });
    console.log("Send Message successfully to private BE API!");


    }catch(error){
      alert("Failed sending message to BE API!")
      console.log('****error sending message to Backend API: ', error);
    }
  }

  //--end sending to DB



  return (
    <div className="container-fluid" >
        <div className="" style={{ marginTop: '20px' }}>
        <h1 style={{fontWeight: 'bold', color: 'white', fontSize: '2.0rem', marginBottom: '25px'}} className=" ">PRIVATE CHAT</h1>
          {privateMessages.length > 0 && privateMessages[0].sender_id && (
            <Head userId={privateMessages[0].sender_id} />
          )}
          <div className="chat-container"  style={{ borderTopLeftRadius: '0px', borderTopRightRadius: '0px'}}>

            <div className="chat-body" style={{ backgroundColor: 'black', overflowY: 'auto', height: '468px' }}>

              {privateMessages.map((priv_message, index) =>
                <div>
                  <p style={{ color:'grey', maxWidth:'50%', fontSize:'10px', marginLeft: priv_message.sender_id === getCurrentUserId() ? 'auto' : '0',
                    border:'#252525', textAlign: 'center', marginBottom:'auto'}}>
                    {priv_message.message_time}
                  </p>

                  <SenderName userID={priv_message.sender_id}/>

                  <p className='rounded' key={index} style={{ backgroundColor: '#252525', padding:'10px', color:'white',
                  maxWidth:'50%', marginLeft: priv_message.sender_id === getCurrentUserId() ? 'auto' : '0', fontSize:'17px', border:'#252525', marginBottom:'5px', 
                  textAlign: priv_message.sender_id === getCurrentUserId() ? 'right' : 'left'}}>
                    {priv_message.message_content}
                  </p>
                </div>
              )}


              {messages.map((message, index) =>
                <p className='rounded' key={index} style={{
                  backgroundColor: '#252525', padding: '10px', color: 'white',
                  maxWidth: '50%', marginLeft: 'auto', fontSize: '17px', border: '#252525', marginBottom: '5px',
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




function Head({userId}) {
  const { name } = useParams();
  const [ avatar, setAvatar ] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const basicInfo = await getUserInfo(userId);
        setAvatar(basicInfo.avatar);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="head-chat">
      <div class="d-flex align-items-center" style={{ width: '100%', padding: '20px', textAlign: 'right' }}>
        {/* <div className="avatar" style={{fontSize: '30px'}}>{avatar}</div> */}
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
    <div className="w-100 mb-4">
      <div className="chat-body d-flex align-items-center" style={{ background: 'black', justifyContent: 'center' }}>
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