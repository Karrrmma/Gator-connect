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
        <div className="row justify-content-center" >
           <div className="">
           <Head/>
            <div className="card h-75 border-0 rounded-pill" style={{ width: '500px'}}>

              <div className="card-body" style={{ backgroundColor: 'black', overflowY: 'auto', height: '550px'}}>
                <div class="d-flex justify-content-start align-items-center" style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right' }}>
                  <SlSpeech style={{fontSize: '48px', color: '#c15757'}}></SlSpeech>
                  <Link to='/channel/General' className='btn btn-link text-decoration-none' style={{color: 'white', fontSize: '25px'}}>General</Link>
                </div>
                <div class="d-flex justify-content-start align-items-center" style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right' }}>
                  <FaUserFriends style={{fontSize: '50px', color: '#c15757'}}></FaUserFriends>
                  <Link to='/channel/Find Roomates' className='btn btn-link text-decoration-none' style={{color: 'white', fontSize: '25px'}}>Find Roomates</Link>
                </div>
                <div class="d-flex justify-content-start align-items-center" style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right' }}>
                  <FaFootballBall style={{fontSize: '46px', color: '#c15757'}}></FaFootballBall>
                  <Link to='/channel/Campus Clubs' className='btn btn-link text-decoration-none' style={{color: 'white', fontSize: '25px'}}>Campus Clubs</Link>
                </div>
                <div class="d-flex justify-content-start align-items-center" style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right' }}>
                  <GiCampingTent style={{fontSize: '50px', color: '#c15757'}}></GiCampingTent>
                  <Link to='/channel/Campus Events' className='btn btn-link text-decoration-none' style={{color: 'white', fontSize: '25px'}}>Campus Events</Link>
                </div>
                <div class="d-flex justify-content-start align-items-center" style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right' }}>
                  <ImBooks style={{fontSize: '50px', color: '#c15757'}}></ImBooks>
                  <Link to='/channel/Study Help' className='btn btn-link text-decoration-none' style={{color: 'white', fontSize: '25px'}}>Study Help</Link>
                </div>
              </div>
               <Bottom/>
               <div className='card border-0' style={{background: 'black', fontSize: '15px' }}>
                <p>Want to chat with your friends? <br></br> Go to Private Chat!</p>
               </div>
            </div>
           </div>
        </div>
      </div>
    );
  };


  function Head(){
    return(
      <div>
        <h5 style={{color: 'white', fontSize: '35px'}} className=" ">PUBLIC CHAT</h5>
        <p style={{color: 'grey', fontSize: '20px'}}> Choose a channel and start chatting with others about <br></br> whatever topics you're interested in! </p>
      </div>
    );
  }


  function Bottom(){
    return(
    <div className="card border-0" style={{ background: 'black'}}>
      <div className="card-body d-flex" style={{ background: 'black', justifyContent: 'center'}}>
        
        <div className='card rounded-pill' style={{backgroundColor: '#AD45FF'}}>
            <Link to='/chat' className="btn btn-link text-decoration-none" style={{color: 'white', fontSize: '20px'}}>
            Private Chat
            </Link>
        </div>
        
      </div>
    </div>
    );
  }
  
  export default PubChat;