import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUserId } from '../../utils/decodeData';
import { useState } from "react";
import { useEffect } from "react";
import { queryData } from '../../utils/queryUser';





const Chat = () => {

  const [privateChats, setPrivateChats] = useState([]);
  const [fetched, setFetched] = useState(false);

    //--fetching existing private chats from DB
  useEffect(() => {
    const fetchPrivateChats = async () => {
      const currentUserID = getCurrentUserId();
      const responseFetch = await fetch(`/api/chat/getPrivateChats/${currentUserID}`);
      if(!responseFetch){
        console.error('Failed to fetch private chats!');
        return;
      }

      try{
        if (!responseFetch.ok) {
          throw new Error(`HTTP error! status: ${responseFetch.status}`);
        }
        const returnFetch = await responseFetch.json();
        console.log("Fetched private chats:", returnFetch);
        return returnFetch;
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
        <div className="row justify-content-center "  >
           <div className="" style={{ marginTop: '20px' }}>
           <Head/>
            <div className="chat-container h-75 border-0" style={{backgroundColor: 'black', width: '500px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px'}}>
              <div className="card-body" style={{overflowY: 'auto', height: '450px'}}>

                {privateChats.map((chats, index) =>
                <SenderName senderID={chats.sender_id} index={index}/>
                )}

              </div>
              <Bottom/>
              
            </div>
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
        setUserData(res);
        setFetched(true);
      }).catch(error => {
        console.error(error); // Handle errors if the Promise is rejected
      });
    },[fetched]);
    
    return(
      <div class="d-flex justify-content-start align-items-center" key={index} style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right' }}>
        {/* <img src={Cat} class="rounded-circle" alt="placeholder pfp" style={{ width: 50, height: 50 }}></img> */}
        <div className="avatar" style={{fontSize: '30px'}}>🐶</div>
        <Link to={`/chatWindow/${userData.fullName}`} className='btn btn-link text-decoration-none' style={{color: 'white', fontSize: '25px'}}>{userData.fullName}</Link>
      </div>
    );
  }


  function Head(){
    return(
      <div>
        <h1 style={{fontWeight: 'bold', color: 'white', fontSize: '2.0rem'}} className=" ">PRIVATE CHAT</h1>
        <p style={{color: 'grey', fontSize: '1.1rem', marginBottom: "1.5rem"}}> Ready to catch up with your friends? Dive into the chat here!</p>
      </div>
    );
  }

  function Bottom(){
    return(
    <div className="card-body d-flex flex-column align-items-center" style={{ background: 'black', justifyContent: 'center', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}}>
          <Link to='/pubChat' className="btn btn-link rounded-pill text-decoration-none" style={{backgroundColor: '#AD45FF', color: 'white', fontSize: '20px', padding: '10px', width: '150px', marginBottom:'10px'}}>
          Public Chat
          </Link>   
          <p style={{background: 'black', fontSize: '15px', marginBottom: '20px'}}>Want to chat to everyone? <br></br> Go to PUBLIC CHAT to connect more!</p>   
    </div>
    );
  }
  
  export default Chat;