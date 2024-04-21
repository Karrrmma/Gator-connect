import React from 'react';
import { Link } from 'react-router-dom';
import Gru from '../../assets/images/gru.jpg';
import Vector from '../../assets/images/vector.jpg';
import Placeholder from '../../assets/images/placeholder_pfp.png';




const Chat = () => {
/*   fetch('/chat', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }, */
    fetch('/chat')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })



    return (
      <div className="container-fluid">
        <div className="row justify-content-center" >
           <div className="col-md-6">
            <div className="card h-75 border-0">
              <Head/>
              <div className="card-body" style={{ overflowY: 'auto', height: '650px'}}>
                <div class="d-flex justify-content-start align-items-center mb-2">
                    <img src={Gru} class="rounded-circle" alt="placeholder pfp" style={{ width: 50, height: 50 }}></img>
                    <Link to='/chatWindow/Fabian Weiland' className='btn btn-link text-dark text-decoration-none' style={{fontSize: '40px'}}>Fabian Weiland</Link>
                </div>
                <div class="d-flex justify-content-start align-items-center mb-2">
                    <img src={Vector} class="rounded-circle" alt="placeholder pfp" style={{ width: 50, height: 50 }}></img>
                    <Link to='/chatWindow/Jose Ortiz' className='btn btn-link text-dark text-decoration-none' style={{fontSize: '40px'}}>Jose Ortiz</Link>
                </div>
                <div class="d-flex justify-content-start align-items-center mb-2">
                    <img src={Placeholder} class="rounded-circle" alt="placeholder pfp" style={{ width: 50, height: 50 }}></img>
                    <Link to='/chatWindow/Marco Lorenz' className='btn btn-link text-dark text-decoration-none' style={{fontSize: '40px'}}>Marco Lorenz</Link>
                </div>
                {/* {Array.from({ length: 10 }).map((_, index) => (
                  <p key={index} style={{ color: 'black', fontSize: '20px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                ))} */}
              </div>
               <Bottom/>
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
    return(
    <div className="card" style={{backgroundColor: '#a28b39'}}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
        <p class="bi bi-arrow-left-circle" style={{color: '#a28b39', fontSize: '30px'}}></p>
        <h5 style={{color: 'white', fontSize: '50px'}} className="card-title mb-0">Private Chat</h5>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
        <Link to='/home' className="bi bi-x-circle" style={{color: 'white', fontSize: '30px'}}></Link>
      </div>
    </div>
    );
  }


  function Bottom(){
    return(
    <div className="card border-0">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>sdfsd</div>
        <div className='card rounded-pill' style={{backgroundColor: '#a28b39'}}>
            <Link to='/pubChat' className="btn btn-link text-dark text-decoration-none" style={{fontSize: '30px'}}>
            Public Chat
            </Link>
        </div>
        <div>sdfsd</div>
      </div>
    </div>
    );
  }
  
  export default Chat;