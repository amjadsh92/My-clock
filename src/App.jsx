
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faPause, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";


function App() {


  

  return (
  <div id="app" className="app">
    
  <div id="title" className="title">
   25 + 5 Clock
  
  </div>
  <BreakAndSessionLengths />
  <Session />
  <Controller />
  </div>
  )
      
}


function BreakAndSessionLengths(){

  
  return(
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
  )
}


function Session(){

  return(
    <div className="session">
    <div className="session-title">Session</div>
    <div className="session-time">25:00</div>
    </div>    
  )
}

function Controller(){

  return(
    <div className="controller">
     <FontAwesomeIcon icon={faPlay} className="play" />
     <FontAwesomeIcon icon={faPause} className="pause" />
     <FontAwesomeIcon icon={faArrowRotateRight} className ="reset" />

    </div>
  )
}

export default App
