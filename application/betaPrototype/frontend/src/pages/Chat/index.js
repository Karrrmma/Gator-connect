/* HEADER
- This file belongs to the overall chat application.
- This file displays all private chats.
- Users can choose one private chat and click on the name
- of the friend they want to read a message or send a message to
-*/

import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUserId } from '../../utils/decodeData';
import { useState } from "react";
import { useEffect } from "react";
import { queryData } from '../../utils/queryUser';
import { getPrivateChats, getUnansweredPrivateChats } from '../../services/Chat/chatService';





const Chat = () => {

  const [privateChats, setPrivateChats] = useState([]);
  const [fetched, setFetched] = useState(false);

    //--fetching existing private chats from DB
  useEffect(() => {
    const fetchPrivateChats = async () => {
      const currentUserID = getCurrentUserId();
      
      try{
        //erster fetch
        // const responseFetch1 = await fetch(`/api/chat/getPrivateChats/${currentUserID}`);
        // if(!responseFetch1){
        //   console.error('Failed to fetch private chats!');
        //   return;
        // }
        
        // if (!responseFetch1.ok) {
        //   throw new Error(`HTTP error! status: ${responseFetch1.status}`);
        // }
        // const returnFetch1 = await responseFetch1.json();
        const returnFetch1 = await getPrivateChats(currentUserID);
        console.log("returnFetch1---Fetched private chats:", returnFetch1);        


        // zweiter fetch
        // const responseFetch2 = await fetch(`/api/chat/getPrivateChats/noAnswer/${currentUserID}`);
        // if(!responseFetch2){
        //   console.error('Failed to fetch private chats with no answer yet!');
        //   return;
        // }
        // if (!responseFetch2.ok) {
        //   throw new Error(`HTTP error! status: ${responseFetch2.status}`);
        // }

        // const returnFetch2 = await responseFetch2.json();
        const returnFetch2 = await getUnansweredPrivateChats(currentUserID);
        console.log("returnFetch2---Fetched private chats with no answer yet:", returnFetch2);


        // combine both fetch returns
        const returnFetch = [...returnFetch1, ...returnFetch2];
        console.log("returnFetch: ", returnFetch);
        //const returnnochMal = { sender_id: returnFetch };
        return returnFetch
      }catch (error){
        console.error('Failed to fetch private chats!: ', error);
      }
      
    }

    fetchPrivateChats().then(res => {
      setPrivateChats(res);
    }).catch(error => {
      console.error(error); // Handle errors if the Promise is rejected
    });
    setFetched(true);
  }, [fetched]);

  //---end fetching


    return (
      <div className="container-fluid" >
           <div className="" style={{ marginTop: '20px' }}>
           <Head/>
            <div className="chat-container ">
              <div className="chat-body" style={{overflowY: 'auto', height: '450px'}}>

                {privateChats.map((chats, index) =>
                <SenderName senderID={chats.sender_id || chats.receiver_id} index={index}/>
                )}
                <p style={{background: 'black', fontSize: '15px', marginTop: '40px'}}>
                  Want to chat with more friends? 
                  <br></br> 
                  Find Friends in 
                  <Link to={`/profile`}> Profile </Link> 
                  and start chatting right away!!
                </p>
                
              </div>

              <Bottom/>
              
           </div>
        </div>
      </div>
    );
  };


  function SenderName({senderID}, {index}){
    const [userData, setUserData] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(()=> {
      console.log('----senderID: ', senderID)
      queryData(senderID).then(res => {
        console.log(res.fullName);
        console.log('--avatar:', res.avatar)
        setUserData(res);
        setFetched(true);
      }).catch(error => {
        console.error(error); // Handle errors if the Promise is rejected
      });
    },[fetched]);
    
    return(
      <div class="d-flex align-items-center" key={index} style={{border: '1px solid black', padding: '10px', textAlign: 'right' }}>
        {/* <div className="avatar" style={{fontSize: '30px'}}>{userData.avatar}</div> */}
        <Link to={`/chatWindow/${userData.fullName}`} className='btn btn-link text-decoration-none' style={{color: 'white', fontSize: '25px'}}>{userData.fullName}</Link>
      </div>
    );
  }


  function Head(){
    return(
      <div>
        <h1 style={{fontWeight: 'bold', color: 'white', fontSize: '2.0rem'}}>PRIVATE CHAT</h1>
        <p style={{color: 'grey', fontSize: '1.1rem', marginBottom: "1.5rem"}}> Ready to catch up with your friends? Dive into the chat here!</p>
      </div>
    );
  }

  function Bottom(){
    return(
    <div className="chat-body d-flex flex-column align-items-center">
          <Link to='/pubChat' className="btn btn-link rounded-pill text-decoration-none" style={{backgroundColor: '#AD45FF', color: 'white', fontSize: '20px', padding: '10px', width: '150px', marginBottom:'10px'}}>
          Public Chat
          </Link>   
          <p style={{background: 'black', fontSize: '15px', marginBottom: '20px'}}>Want to chat to everyone? <br></br> Go to PUBLIC CHAT to connect more!</p>   
    </div>
    );
  }
  
  export default Chat;