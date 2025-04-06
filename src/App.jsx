
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faPause, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";


function App() {


  

  return (
  <div id="app" className="app">
    
  <div id="title" className="title">
   25 + 5 Clock
  
  </div>
  <div id="break-session-length" className="break-session-length">
      <div id="break-length" className="break-length">
        <div>Break Length</div>
        <div className="break-increment">
        <FontAwesomeIcon icon={faArrowUp} className="arrow" />
        <span>5</span>
        <FontAwesomeIcon icon={faArrowDown} className="arrow" />
        </div>
        
      </div>
      <div id="session-length" className="session-length" >
      <div>Session Length</div>
      <div className = "session-increment">
      <FontAwesomeIcon icon={faArrowUp} className="arrow" />
      <span>25</span>
      <FontAwesomeIcon icon={faArrowDown} className="arrow" />
      
      
      </div>

      </div>
  </div>
  <div className="session">
    <div className="session-title">Session</div>
    <div className="session-time">25:00</div>
 </div>
 <div className="controller">
     <FontAwesomeIcon icon={faPlay} className="play" />
     <FontAwesomeIcon icon={faPause} className="pause" />
     <FontAwesomeIcon icon={faArrowRotateRight} className ="reset" />

 </div>
  </div>
  )
      
}

export default App
