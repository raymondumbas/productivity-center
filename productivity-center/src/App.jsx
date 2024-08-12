import { useState } from 'react'
import NewHabitCard from './NewHabitCard.jsx'
import TimeClockCard from './TimeClockCard.jsx'
import HabitListCard from './HabitListCard.jsx'
import NavBar from './NavBar.jsx'
import GoalListCard from './GoalListCard.jsx'
import NewGoalCard from './NewGoalCard.jsx'
import './App.css';

export default function App() {
  const[page, setPage] = useState("timeClock");
  const[prevPage, setPrevPage] = useState("");

  console.log("Current Page:",page);
  console.log("Previous Page:",prevPage);

  // Time Clock Page
  if(page == "timeClock"){
    return (
     <div className = "app"> 
        <NavBar prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
        <TimeClockCard className = "card" prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
     </div>
    )
  }

  // New Habit Page
  if(page == "newHabit"){
    return(
      <div className = "app">
        <NavBar prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
        <NewHabitCard prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
      </div>
    )
  }

  //Habits Page
  if(page == "habits"){
    return (
      <div className = "app">
        <NavBar prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
        <HabitListCard prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
      </div>
    )
  }

  //New Goal Page
  if(page == "newGoal"){
    return(
      <div className = "app">
        <NavBar prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
        <NewGoalCard prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
      </div>
    )
  }

  //Goals Page
  if(page == "goals"){
    return (
      <div className = "app">
        <NavBar prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
        <GoalListCard prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
      </div>
    )
  }

}


