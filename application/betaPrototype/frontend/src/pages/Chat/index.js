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
           <div className="" style={{ marginTop: '20px' }}>
           <Head/>
            <div className="chat-container h-75 border-0" style={{backgroundColor: 'black', width: '500px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px'}}>
              
              <div className="card-body" style={{overflowY: 'auto', height: '450px'}}>
                <div class="d-flex justify-content-start align-items-center" style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right' }}>
                    {/* <img src={Cat} class="rounded-circle" alt="placeholder pfp" style={{ width: 50, height: 50 }}></img> */}
                    <div className="avatar" style={{fontSize: '30px'}}>🐳</div>
                    <Link to='/chatWindow/Fabian Weiland' className='btn btn-link text-decoration-none' style={{color: 'white', fontSize: '25px'}}>Fabian Weiland</Link>
                </div>
                <div class="d-flex justify-content-start align-items-center" style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right' }}>
                    {/* <img src={Dog} class="rounded-circle" alt="placeholder pfp" style={{ width: 50, height: 50 }}></img> */}
                    <div className="avatar" style={{fontSize: '30px'}}>🎄</div>
                    <Link to='/chatWindow/Jose Ortiz' className='btn btn-link text-decoration-none' style={{color: 'white', fontSize: '25px'}}>Jose Ortiz</Link>
                </div>
                <div class="d-flex justify-content-start align-items-center" style={{ width: '100%', border: '1px solid black', padding: '10px', textAlign: 'right' }}>
                    {/* <img src={Placeholder} class="rounded-circle" alt="placeholder pfp" style={{ width: 50, height: 50 }}></img> */}
                    <div className="avatar" style={{fontSize: '30px'}}>🐶</div>
                    <Link to='/chatWindow/Marco Lorenz' className='btn btn-link text-decoration-none' style={{color: 'white', fontSize: '25px'}}>Marco Lorenz</Link>
                </div>
              </div>
              <Bottom/>
              
            </div>
           </div>
        </div>
      </div>
    );
  };

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