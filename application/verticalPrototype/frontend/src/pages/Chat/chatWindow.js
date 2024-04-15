import React from 'react';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';



const ChatWindow = () => {

    return (
      <div className="container-fluid">
        <div className="row justify-content-center" >
           <div className="col-md-6">
            <div className="card h-100 border-0">
                <Head/>
                <div className="card-body" style={{ overflowY: 'auto', height: '535px'}}>
                    <p style={{ color: 'grey', fontSize: '30px'}}>Lorem Ipsum</p>
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
    const {name} = useParams()

    return(
    <div className="card" style={{backgroundColor: '#a28b39'}}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
        <Link to='/chat' class="bi bi-arrow-left-circle" style={{ color: 'white', fontSize: '30px'}}></Link>
        <h5 style={{color: 'white',fontSize: '50px'}} className="card-title mb-0">Private Chat</h5>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
        <Link to='/home' className="bi bi-x-circle" style={{color: 'white', fontSize: '30px'}}></Link>
      </div>
      <div className='card-body d-flex justify-content-between align-items-center'>
        <p style={{ color: 'white', fontSize: '30px'}}>{name}</p>
      </div>
    </div>
    );
  }


  function Bottom(){
    return(
    <div className="card border-0">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>sdfsd</div>
        <input type="text" class="form-control" style={{backgroundColor: '#dad9d2', height: '50px'}} placeholder="Type here ..." aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="grey" class="bi bi-send" viewBox="0 0 16 16">
          <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
        </svg>            
        <div>sdfsd</div>
      </div>
    </div>
    );
  }
  
  export default ChatWindow;