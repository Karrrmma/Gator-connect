import React from 'react';
import { Link } from 'react-router-dom';
import Dog from '../../assets/images/art10.jpg';
import Cat from '../../assets/images/art5.jpg';
import Placeholder from '../../assets/images/placeholder_pfp.png';




const Chat = () => {
/*   fetch('/chat', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }, */

/*   oder so:  fetch('/chat')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    }) */



    return (
      <div className="container-fluid" >
        <div className="row justify-content-center "  >
           <div className="">
           <Head/>
            <div className="card h-75 border-0 rounded-pill" style={{ width: '500px'}}>
              
              <div className="card-body" style={{ backgroundColor: 'black', overflowY: 'auto', height: '550px'}}>
                <div class="d-flex justify-content-start align-items-center" style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right' }}>
                    <img src={Cat} class="rounded-circle" alt="placeholder pfp" style={{ width: 50, height: 50 }}></img>
                    <Link to='/chatWindow/Fabian Weiland' className='btn btn-link text-decoration-none' style={{color: 'white', fontSize: '25px'}}>Fabian Weiland</Link>
                </div>
                <div class="d-flex justify-content-start align-items-center" style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right' }}>
                    <img src={Cat} class="rounded-circle" alt="placeholder pfp" style={{ width: 50, height: 50 }}></img>
                    <Link to='/chatWindow/Jose Ortiz' className='btn btn-link text-decoration-none' style={{color: 'white', fontSize: '25px'}}>Jose Ortiz</Link>
                </div>
                <div class="d-flex justify-content-start align-items-center" style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right' }}>
                    <img src={Placeholder} class="rounded-circle" alt="placeholder pfp" style={{ width: 50, height: 50 }}></img>
                    <Link to='/chatWindow/Marco Lorenz' className='btn btn-link text-decoration-none' style={{color: 'white', fontSize: '25px'}}>Marco Lorenz</Link>
                </div>
              </div>
               <Bottom/>
               <div className='card border-0' style={{background: 'black', fontSize: '15px' }}>
                <p>Want to chat to everyone? <br></br> Go to PUBLIC CHAT to connect more!</p>
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
        <h5 style={{color: 'white', fontSize: '35px'}} className=" ">PRIVATE CHAT</h5>
        <p style={{color: 'grey', fontSize: '20px'}}> Ready to catch up with your friends?<br></br> Dive into the chat here!</p>
      </div>
    );
  }

  function Bottom(){
    return(
    <div className="card border-0" style={{ background: 'black'}}>
      <div className="card-body d-flex" style={{ background: 'black', justifyContent: 'center'}}>
        
        <div className='card rounded-pill' style={{backgroundColor: '#AD45FF'}}>
            <Link to='/pubChat' className="btn btn-link text-decoration-none" style={{color: 'white', fontSize: '20px'}}>
            Public Chat
            </Link>
        </div>
        
      </div>
    </div>
    );
  }
  
  export default Chat;