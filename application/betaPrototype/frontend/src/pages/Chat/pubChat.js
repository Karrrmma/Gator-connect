import React from 'react';
import { Link } from 'react-router-dom';
import { ImBooks } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";
import { SlSpeech } from "react-icons/sl";
import { FaFootballBall } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";



const PubChat = () => {


    return (
      <div className="container-fluid">
           <div className="" style={{ marginTop: '20px' }}>
           <Head/>
            <div className="chat-container">

              <div className="chat-body" style={{ overflowY: 'auto', height: '450px'}}>
                <div class="d-flex justify-content-start align-items-center" style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right' }}>
                  <SlSpeech style={{fontSize: '40px', color: '#c15757'}}></SlSpeech>
                  <Link to='/channel/General' className='btn btn-link text-decoration-none' style={{color: 'white', fontSize: '25px'}}>General</Link>
                </div>
                <div class="d-flex justify-content-start align-items-center" style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right' }}>
                  <FaUserFriends style={{fontSize: '40px', color: '#c15757'}}></FaUserFriends>
                  <Link to='/channel/Find Roomates' className='btn btn-link text-decoration-none' style={{color: 'white', fontSize: '25px'}}>Find Roomates</Link>
                </div>
                <div class="d-flex justify-content-start align-items-center" style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right' }}>
                  <FaFootballBall style={{fontSize: '40px', color: '#c15757'}}></FaFootballBall>
                  <Link to='/channel/Campus Clubs' className='btn btn-link text-decoration-none' style={{color: 'white', fontSize: '25px'}}>Campus Clubs</Link>
                </div>
                <div class="d-flex justify-content-start align-items-center" style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right' }}>
                  <GiCampingTent style={{fontSize: '40px', color: '#c15757'}}></GiCampingTent>
                  <Link to='/channel/Campus Events' className='btn btn-link text-decoration-none' style={{color: 'white', fontSize: '25px'}}>Campus Events</Link>
                </div>
                <div class="d-flex justify-content-start align-items-center" style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right' }}>
                  <ImBooks style={{fontSize: '40px', color: '#c15757'}}></ImBooks>
                  <Link to='/channel/Study Help' className='btn btn-link text-decoration-none' style={{color: 'white', fontSize: '25px'}}>Study Help</Link>
                </div>
              </div>
              <Bottom/>
           </div>
        </div>
      </div>
    );
  };


  function Head(){
    return(
      <div>
        <h1 style={{fontWeight: 'bold', color: 'white', fontSize: '2.0rem'}} className=" ">PUBLIC CHAT</h1>
        <p style={{color: 'grey', fontSize: '1.1rem', marginBottom: "1.5rem"}}> Choose a channel and start chatting with others about <br></br> whatever topics you're interested in!</p>
      </div>
    );
  }


  function Bottom(){
    return(
    <div className="chat-body d-flex flex-column align-items-center" style={{ background: 'black', justifyContent: 'center', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}}>
      <Link to='/chat' className="btn rounded-pill btn-link text-decoration-none" style={{backgroundColor: '#AD45FF', color: 'white', fontSize: '20px', fontSize: '20px', padding: '10px', width: '150px', marginBottom:'10px'}}>      
      Private Chat
      </Link>
      <p style={{background: 'black', fontSize: '15px', marginBottom: '10px' }}>Want to chat with your friends? <br></br> Go to Private Chat!</p>
    </div>
    );
  }
  
  export default PubChat;
