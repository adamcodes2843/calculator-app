import buttonsArray from './buttons.js'
import {useState} from 'react'

const originalDisplay = [0];
const originalPreviousDisplay = [];

const Display = ({previousDisplay, display}) => {
  return (
    <div id="output" className="col-span-4 flex flex-col justify-end items-end bg-black text-white overflow-hidden pb-2">
      <div id="previous-display" className="text-xl pr-2 text-red-400 h-1/2">{previousDisplay}</div>
      <div id="display" className="pr-2 h-1/2">{display}</div>
    </div>
  )
}

const ButtonKey = ({buttons: {key, id, value, type}, clickyFunc}) => {
  if (id === "clear" || id === "equals"){
    return (
      <button className="bg-white bg-opacity-70 col-span-2 p-2 hover:bg-black hover:bg-opacity-5 active:bg-opacity-0" id={id} onClick={()=> clickyFunc(key, value, type)}>
        {key}
      </button>
    )
  } else {
  return (
    <button className="bg-white bg-opacity-70 p-2 hover:bg-black hover:bg-opacity-5 active:bg-opacity-0" id={id} onClick={()=> clickyFunc(key, value, type)}>
      {key}
    </button>
  )
  }
}

const Buttons = ({clickyFunc}) => {
  return buttonsArray.map((buttons) => <ButtonKey buttons={buttons} clickyFunc={clickyFunc} />)
}

function App() {
  const [display, setDisplay] = useState(originalDisplay)
  const [previousDisplay, setPreviousDisplay] = useState(originalPreviousDisplay)

  const clickyFunc = (key, value, type) => {
    if (key === "AC") {
      setDisplay(originalDisplay)
      setPreviousDisplay(originalPreviousDisplay)
    } else if (typeof value === 'number' && display == 0 || typeof value === 'number' && typeof display === 'number') {
      setDisplay([value])
      setPreviousDisplay([value])
    } else if (typeof value == 'number' && display != 0) {
        if (typeof display[0] != 'number'){
        setDisplay(display.slice(1,(display.length-1)).concat(value))
        setPreviousDisplay(previousDisplay.concat(value))
        } else {
        setDisplay(display.concat(value))
        setPreviousDisplay(previousDisplay.concat(value))
       }
    } else if (key === "DEL" && previousDisplay.length === 1){
      setDisplay(originalDisplay)
      setPreviousDisplay(originalPreviousDisplay)
    } else if (key === "DEL" && previousDisplay.length > 1) {
      setDisplay(display.slice(0,(display.length-1)))
      setPreviousDisplay(previousDisplay.slice(0,(previousDisplay.length-1)))
    } else if (key === "." && previousDisplay === originalPreviousDisplay){
      setDisplay(display.concat(value))
      setPreviousDisplay([0, value])
    } else if (key === "." && display.indexOf(".") === -1 && typeof display[display.length-1] === 'number') {
      setDisplay(display.concat(value))
      setPreviousDisplay(previousDisplay.concat(value))
    } else if (type === "operator-equals") {
      setDisplay(eval(previousDisplay.join("")))
      setPreviousDisplay(previousDisplay.concat(value).concat(eval(previousDisplay.join(""))))
    } else if (key === "-" && previousDisplay[previousDisplay.length - 1] !== "." && typeof previousDisplay[previousDisplay.length - 1] === "string" && typeof previousDisplay[previousDisplay.length - 2] === "number" && previousDisplay[previousDisplay.length - 1] !== "-"){
      setDisplay([value])
      setPreviousDisplay(previousDisplay.concat(value))
    } else if (type === "operator" && typeof previousDisplay[previousDisplay.length - 1] === "number") {
      if (previousDisplay.indexOf("=") >= 0){
        let i = previousDisplay.indexOf("=")
        setDisplay([value])
        setPreviousDisplay(previousDisplay.slice((i+1), previousDisplay.length).concat(value))
      } else { 
      setDisplay([value])
      setPreviousDisplay(previousDisplay.concat(value))
      } 
    } else if (type === "operator" && previousDisplay[previousDisplay.length - 1] !== "." && previousDisplay[previousDisplay.length - 1] !== "-" && typeof previousDisplay[previousDisplay.length - 1] === "string" ) {
      setDisplay([value])
      setPreviousDisplay(previousDisplay.slice(0,previousDisplay.length - 1).concat(value))
    } else if (type === "operator" && key !== "-" && previousDisplay[previousDisplay.length - 1] === "-" && typeof previousDisplay[previousDisplay.length - 2] === "string" ) {
      setDisplay([value])
      setPreviousDisplay(previousDisplay.slice(0, previousDisplay.length - 2).concat(value))
    } 
  }
  console.log(previousDisplay)
  return (
    <div className="App w-screen h-screen flex justify-center items-center bg-gradient-to-br from-green-400 to-yellow-400 font-sans">
      <div className="calculator h-96 grid w-80 grid-cols-4 grid-rows-6 gap-0.5 text-3xl bg-white bg-opacity-80">
        <Display previousDisplay={previousDisplay} display={display} />
        <Buttons clickyFunc={clickyFunc} />
      </div>
    </div>
  );
}

export default App;