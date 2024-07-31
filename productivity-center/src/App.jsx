import { useState } from 'react'
import './App.css'
import Button from './Button.jsx'
import NewHabitCard from './NewHabitCard.jsx'
import TimeClockCard from './TimeClockCard.jsx'

export default function App() {
  const[page, setPage] = useState("home");
  const[prevPage, setPrevPage] = useState("");

  console.log("Current Page:",page);
  console.log("Previous Page:",prevPage);
  // Home Page
  if(page == "home"){
    return (
      <>
        <TimeClockCard prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
      </>
    )
  }

  // Time Clock Page
  if(page == "timeClock"){
    return (
     <>
        <TimeClockCard prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
     </>
    )
  }

  // New Habit Page
  if(page == "newHabit"){
    return(
      <>
        <NewHabitCard prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
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


