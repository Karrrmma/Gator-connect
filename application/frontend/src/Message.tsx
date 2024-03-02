import { Link } from "react-router-dom";

function Message(){
    /*const karma = 'Karma Gyalpo';
    const hoanganh = 'Hoang-Anh Tran';
    const dustin = 'Dustin';
    const jeawan = 'Jeawan';
    const fabian = 'fabian';*/
    return(
        <div>
            <h3>Software Engineering Class SFSU <br/> Spring 2024 <br/>Section 05 <br/>Team 03</h3>
            <h1>About Page <br/> GATOR CONNECT</h1>
            <ul>
                <li><Link to="/about/karma">Karma Gyalpo</Link></li>
                <li><Link to="/about/jeawan">Jeawan Jang</Link></li>
                <li><Link to="/about/dustin">Dustin Meza</Link></li>
                <li><Link to="/about/hoanganh">Hoang-Anh Tran</Link></li>
                <li><Link to="/about/fabiweiland">Fabian Weiland</Link></li>
                <li><Link to="/about/ralph">Ralph Quiambao</Link></li>


            </ul>
        </div>
    )
    }

export default Message;