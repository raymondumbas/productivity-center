import { useState } from 'react'
import './App.css'
import Button from './Button.jsx'
import NewHabitCard from './NewHabitCard.jsx'
import TimeClockCard from './TimeClockCard.jsx'

export default function App() {
  const[page, setPage] = useState("home");
  const[update, setUpdate] = useState("");
  // Home Page
  if(page == "home"){
    return (
      <>
        <NewHabitCard update = "update" setUpdate = {setUpdate}/>
        <TimeClockCard update = "update" setUpdate = {setUpdate}/>
      </>
    )
  }

  //Time Clock Page
  if(page == "clock"){
    return (
     <>
     </>
    )
  }

  //Habits Page
  if(page == "habits"){
    return (
      <>
      </>
    )
  }

  //Goals Page
  if(page == "goals"){
    return (
      <>
      </>
    )
  }

}


