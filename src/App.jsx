/* eslint-disable */

import { useState, useEffect} from "react";
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faPause, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";



function App() {

  const [length, setLength] = useState({breakLength:5, sessionLength:2})



  

  return (
  <div id="app" className="app">
    
  <div id="title" className="title">
   25 + 5 Clock
  
  </div>
  <BreakAndSessionLengths length = {length} setLength = {setLength} />
  <Session length={length} />
  <Controller />
  </div>
  )
      
}


function BreakAndSessionLengths({length, setLength}){
   
  let {breakLength, sessionLength} = length

  const incrementBreak = () => {
    if ( breakLength > 0 && breakLength < 60){

      breakLength += 1
      setLength({...length ,breakLength})

    }
    

  }


  const decrementBreak = () => {
    if ( breakLength > 1 && breakLength <= 60){
    breakLength -= 1
    setLength({...length ,breakLength})
    }

  }
  

  const incrementSession = () => {
    if ( sessionLength > 0 && sessionLength < 60){
    sessionLength += 1
    setLength({...length ,sessionLength})
    }

  }


  const decrementSession = () => {
    if ( sessionLength > 1 && sessionLength <= 60){
    sessionLength -= 1
    setLength({...length ,sessionLength})
    }

  }
  
  
  return(
    <div id="break-session-length" className="break-session-length">
    <div id="break-length" className="break-length">
      <div>Break Length</div>
      <div className="break-increment">
      <FontAwesomeIcon type = "submit" icon={faArrowUp} className="arrow"  onClick={incrementBreak}/>
      <p>{breakLength}</p>
      <FontAwesomeIcon type = "submit"  icon={faArrowDown} className="arrow" onClick={decrementBreak} />
      </div>
      
    </div>
    <div id="session-length" className="session-length" >
    <div>Session Length</div>
    <div className = "session-increment">
    <FontAwesomeIcon type = "submit"  icon={faArrowUp} className="arrow" onClick={incrementSession} />
    <p>{sessionLength}</p>
    <FontAwesomeIcon type = "submit"  icon={faArrowDown} className="arrow" onClick={decrementSession} />
    
    
    </div>

    </div>
  </div>
  )
}


function Session({length}){
  
  const [minutes, setMinutes] = useState(25)
  let [seconds, setSeconds] = useState(0)
  const {breakLength, sessionLength} = length
  
   seconds = seconds.toString().padStart(2, '0');
   

  useEffect(() => {
    
    setMinutes(sessionLength);
    setSeconds(0); 
  
  const interval = setInterval(() => {
    setSeconds((prevSeconds) => {
      
      if (prevSeconds === 0) {
      
        setMinutes((prevMinutes) => prevMinutes - 1);
        return 59;
      } else {
        return prevSeconds - 1;
      }
    });
  }, 1000);

  return () => clearInterval(interval);
  }, [sessionLength])

  return(
    <div className="session">
    <div className="session-title">Session</div>
    <div className="session-time">{`${minutes}:${seconds}`}</div>
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
