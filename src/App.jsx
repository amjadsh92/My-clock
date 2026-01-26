/* eslint-disable */

import { useState, useEffect, useRef} from "react";
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faPause, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";



function App() {

  const [length, setLength] = useState({breakLength:5, sessionLength:25})

  const [onPlay, setOnPlay] = useState(false)

  const [onChangeBreak, setOnChangeBreak] = useState(false)

  const [onChangeSession, setOnChangeSession] = useState(false)

  const [reset, setReset] = useState(false)

  



  

  return (
  <div id="app" className="app">
    
  <div id="title" className="title">
   25 + 5 Clock
  
  </div>
  <BreakAndSessionLengths length = {length} setLength = {setLength} onPlay = {onPlay} setOnChangeSession ={setOnChangeSession} setOnChangeBreak ={setOnChangeBreak} />
  <Session length={length} setLength = {setLength} onPlay = {onPlay} setOnPlay={setOnPlay} reset = {reset} setReset = {setReset} onChangeSession={onChangeSession} setOnChangeSession = {setOnChangeSession} onChangeBreak={onChangeBreak} setOnChangeBreak = {setOnChangeBreak} />
  <Controller onPlay={onPlay} setReset = {setReset} setOnPlay = {setOnPlay}  />
  </div>
  )
      
}


function BreakAndSessionLengths({length, setLength, onPlay, setOnChangeSession, setOnChangeBreak}){
  
  let {breakLength, sessionLength} = length

  const incrementBreak = () => {
    if ( breakLength > 0 && breakLength < 60){

      breakLength += 1
      setLength({...length ,breakLength})
      setOnChangeBreak(true)
      
      

    }
    

  }


  const decrementBreak = () => {
    if ( breakLength > 1 && breakLength <= 60){
    breakLength -= 1
    setLength({...length ,breakLength})
    setOnChangeBreak(true)
    
    }

  }
  

  const incrementSession = () => {
    if ( sessionLength > 0 && sessionLength < 60){
    sessionLength += 1
    setLength({...length ,sessionLength})
    setOnChangeSession(true)
    
    }

  }


  const decrementSession = () => {
    if ( sessionLength > 1 && sessionLength <= 60){
    sessionLength -= 1
    setLength({...length ,sessionLength})
    setOnChangeSession(true)
    
    }

  }
  
  
  return(
    <div id="break-session-length" className="break-session-length">
    <div id="break-length" className="break-length">
      <div>Break Length</div>
      <div className="break-increment">
      <FontAwesomeIcon type = "submit" icon={faArrowUp} className={`arrow-up`}  onClick={!onPlay ? incrementBreak: null}/>
      <p>{breakLength}</p>
      <FontAwesomeIcon type = "submit"  icon={faArrowDown} className={`arrow-down` } onClick={!onPlay ? decrementBreak: null} />
      </div>
      
    </div>
    <div id="session-length" className="session-length" >
    <div>Session Length</div>
    <div className = "session-increment">
    <FontAwesomeIcon type = "submit"  icon={faArrowUp} className={`arrow-up`} onClick={!onPlay ? incrementSession : null} />
    <p>{sessionLength}</p>
    <FontAwesomeIcon type = "submit"  icon={faArrowDown} className={`arrow-down`} onClick={!onPlay ? decrementSession: null} />
    
    
    </div>

    </div>
  </div>
  )
}


function Session({length, setLength, onPlay, setOnPlay,  onChangeBreak, setOnChangeBreak, onChangeSession, setOnChangeSession, reset, setReset}){
  
  const [minutes, setMinutes] = useState(length.sessionLength)
  let [seconds, setSeconds] = useState(0)
  let [sessionPeriod, setSessionPeriod] = useState(true) 
  let [dangerZone, setDangerZone] =  useState(false)

  const {breakLength, sessionLength} = length

  let timer;
  
  
   seconds = seconds.toString().padStart(2, '0');

   const beepRef = useRef(null)

   const updateTimer = (lengthOfNextSession, onSessionPeriod) => {

    timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if(Number(prevSeconds) === 0){
          setMinutes((prevMinutes) => prevMinutes -1 )
          return 59
        }
        else{
          return prevSeconds - 1
        }
      })
    },1000)

     if(minutes === 0 && Number(seconds) === 0){
      
      
      clearInterval(timer)
      if (beepRef.current) {
        beepRef.current.currentTime = 0;
        beepRef.current.play();
      
    }

      setTimeout( () => {
      if (beepRef.current) {
          beepRef.current.currentTime = 0;
          beepRef.current.pause();
        
      }
       
      setSessionPeriod(onSessionPeriod)
      setMinutes(lengthOfNextSession)
      }, 5000)
      
      
     }

     if (minutes < 1 && Number(seconds) === 59){
      setDangerZone(true)

     }

     if(minutes >= 1){
      setDangerZone(false)
     }


   }
   

  

  useEffect(() => {

   if(onPlay) {  
    if(reset){
      setLength({breakLength:5, sessionLength:25})
      setOnPlay(false)
      setOnChangeBreak(false)
      setOnChangeSession(false)
      setSessionPeriod(true)
      setMinutes(25)
      setSeconds(0)
      setReset(false)
    }  
    
    else if(sessionPeriod){
    updateTimer(breakLength,false)
    }
    else if(!sessionPeriod){
      updateTimer(sessionLength,true)
    }

  }
  else{
    if(reset){
      setLength({breakLength:5, sessionLength:25})
      setOnPlay(false)
      setOnChangeBreak(false)
      setOnChangeSession(false)
      setSessionPeriod(true)
      setMinutes(25)
      setSeconds(0)
      setReset(false)
    }  
    
    else if(sessionPeriod && onChangeSession){
      setMinutes(sessionLength)
      setSeconds(0)
      setOnChangeSession(false)
      if(minutes > 1){
        setDangerZone(false)
       }

    }
    else if(!sessionPeriod && onChangeBreak){
      setMinutes(breakLength)
      setSeconds(0)
      setOnChangeBreak(false)
      if(minutes > 1){
        setDangerZone(false)
       }
    }
    else{
      setOnChangeBreak(false)
      setOnChangeSession(false)
      if(minutes > 1){
        setDangerZone(false)
       }

    }



    
    
  }

    return () => clearInterval(timer)
    
  }, [length, minutes,seconds, sessionPeriod,sessionLength, breakLength, onPlay, onChangeSession, onChangeBreak, reset])

  return(
    <div className="session">
    <div className={`${dangerZone ? "session-title-danger" : "session-title"}`}>{sessionPeriod ? "Session" : "Break"}</div>
    <div className={`${dangerZone ? "session-time-danger" : "session-time"}`}>{`${minutes}:${seconds}`}</div>
    <audio ref={beepRef} id="beep" src="/session-break-timer/beep-01a.mp3" loop></audio>
    </div>    
  )
}

function Controller({onPlay, setOnPlay, setReset}){

  const play = () => {
     
     setOnPlay(true)
    

  }

  const pause = () => {

    setOnPlay(false)
 
  }

  const reset = () => {

    setReset(true)
  }

  return(
    <div className="controller">
     <FontAwesomeIcon icon={faPlay} className="play" onClick={play} />
     <FontAwesomeIcon icon={faPause} className="pause" onClick={pause} />
     <FontAwesomeIcon icon={faArrowRotateRight} className ="reset" onClick={reset} />

    </div>
  )
}

export default App




