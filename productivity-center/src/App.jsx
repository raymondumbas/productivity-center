import { useState } from 'react'
import './App.css'
import Button from './Button.jsx'
import NewHabitCard from './NewHabitCard.jsx'

export default function App() {
  const[page, setPage] = useState("home");
 
  // Home Page
  if(page == "home"){
    return (
      <>
        <NewHabitCard/>
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
      <Button onclick ={() => setPage("home")} text = "Change to home"/>
    )
  }

}


