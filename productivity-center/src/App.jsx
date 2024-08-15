// Import React Hooks
import { useState } from 'react'

// Import Components
import NewHabitCard from './NewHabitCard.jsx'
import TimeClockCard from './TimeClockCard.jsx'
import HabitListCard from './HabitListCard.jsx'
import NavBar from './NavBar.jsx'
import GoalListCard from './GoalListCard.jsx'
import NewGoalCard from './NewGoalCard.jsx'

//Import Styles
import './App.css';

/**
* Return the relevant React Page Components
* @param {} none
* @returns {} void
*/
export default function App() {

  // React Hooks
  const[page, setPage] = useState("timeClock");
  const[prevPage, setPrevPage] = useState("");

  // Time Clock Page
  if(page == "timeClock"){
    return (
      <div className = "app">
        <NavBar prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
        <div className = "pageContent"> 
            <div className = "siteTitle">Progressivity</div>
            <TimeClockCard className = "card" prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
        </div>
      </div>

    )
  }

  // New Habit Page
  if(page == "newHabit"){
    return(
      <div className = "app">
      <NavBar prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
      <div className = "pageContent">
      <div className = "siteTitle">Progressivity</div>
        <NewHabitCard prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
      </div> 
      </div>

    )
  }

  //Habits Page
  if(page == "habits"){
    return (
      <div className = "app">
      <NavBar prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
      <div className = "pageContent">
        <div className = "siteTitle">Progressivity</div>
        <HabitListCard prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
      </div>
      </div>

    )
  }

  //New Goal Page
  if(page == "newGoal"){
    return(

      <div className = "app">
        <NavBar prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
        <div className = "pageContent">
        <div className = "siteTitle">Progressivity</div>
        <NewGoalCard prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
        </div>
      </div>

    )
  }

  //Goals Page
  if(page == "goals"){
    return (
      <div className = "app">
        <NavBar prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
        <div className = "pageContent">
          <div className = "siteTitle">Progressivity</div>
          <GoalListCard prevPage = {prevPage} setPrevPage = {setPrevPage} page = {page} setPage = {setPage}/>
        </div>
      </div>

    )
  }

}


