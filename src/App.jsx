/* eslint-disable */

import { useState, useEffect} from "react";
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faPause, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";



function App() {

  const [length, setLength] = useState({breakLength:2, sessionLength:1})



  

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
  
  const [minutes, setMinutes] = useState(length.sessionLength)
  let [seconds, setSeconds] = useState(0)
  let [sessionPeriod, setSessionPeriod] = useState(true) 
  const {breakLength, sessionLength} = length
  let sessionTimer
  let breakTimer;
  
   seconds = seconds.toString().padStart(2, '0');

   const updateSessionTimer = () => {

    sessionTimer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if(prevSeconds === 0){
          setMinutes((prevMinutes) => prevMinutes -1 )
          return 59
        }
        else{
          return prevSeconds - 1
        }
      })
    },1000)

     if(minutes === 0 && seconds === "00"){
      clearInterval(sessionTimer)
      setSessionPeriod(false)
      setMinutes(length.breakLength)
     }


   }
   

   const updateBreakTimer = () => {

    sessionTimer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if(prevSeconds === 0){
          setMinutes((prevMinutes) => prevMinutes -1 )
          return 59
        }
        else{
          return prevSeconds - 1
        }
      })
    },1000)

     if(minutes === 0 && seconds === "00"){
      clearInterval(sessionTimer)
      setSessionPeriod(true)
      setMinutes(length.sessionLength)
     }


   }
   

  useEffect(() => {

    
    
    if(sessionPeriod){
    updateSessionTimer()
    }
    else if(!sessionPeriod){
      updateBreakTimer()
    }

    return () => clearInterval(sessionTimer)
    
  }, [minutes,seconds, sessionPeriod])

  return(
    <div className="session">
    <div className="session-title">{sessionPeriod ? "Session" : "Break"}</div>
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




// useEffect(() => {
//   let sessionInterval;
//   let breakInterval;
//   if (sessionPeriod){
//   setMinutes(sessionLength);
//   setSeconds(0); 


// sessionInterval = setInterval(() => {
//   setSeconds((prevSeconds) => {

    
    
//     if (prevSeconds === 0) {
    
//       setMinutes((prevMinutes) =>{ 
//         if(prevMinutes === 0){
//           setSessionPeriod(!sessionPeriod)
//           clearInterval(sessionInterval)

//           return 0
//         } 
//         else{
//         return prevMinutes - 1}});
//       return 59;
//     } 

//     else {
//       return prevSeconds - 1;
//     }
//   });
// }, 1000);

// }else{

// setMinutes(breakLength);
// setSeconds(0); 
// breakInterval = setInterval(() => {
//   setSeconds((prevSeconds) => {
    
//     if (prevSeconds === 0) {
    
//       setMinutes((prevMinutes) => prevMinutes - 1);
//       return 59;
//     } else {
//       return prevSeconds - 1;
//     }
//   });
// }, 1000);

// }

// return () => {
//   clearInterval(sessionInterval)
//   clearInterval(breakInterval)};
// }, [sessionLength, breakLength])