import { useState } from 'react'
import './App.css'
import Button from './Button.jsx'
import NewHabitCard from './NewHabitCard.jsx'
import TimeClockCard from './TimeClockCard.jsx'
import HabitListCard from './HabitListCard.jsx'
import NavBar from './NavBar.jsx'

export default function App() {
  const[page, setPage] = useState("timeClock");
  const[prevPage, setPrevPage] = useState("");

  console.log("Current Page:",page);
  console.log("Previous Page:",prevPage);

  // Time Clock Page
  if(page == "timeClock"){
    return (
     <>
        <NavBar prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
        <TimeClockCard prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
     </>
    )
  }

  // New Habit Page
  if(page == "newHabit"){
    return(
      <>
        <NavBar prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
        <NewHabitCard prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
      </>
    )
  }

  //Habits Page
  if(page == "habits"){
    return (
      <>
        <NavBar prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
        <h1>Your Habits</h1>
        <HabitListCard prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
      </>
    )
  }

  //Goals Page
  if(page == "goals"){
    return (
      <>
        <NavBar prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
        Goals Page WIP
      </>
    )
  }

}


