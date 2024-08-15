// Import React Components
import Button from './Button.jsx'

// Import styles
import './NavBar.css'

/**
 * Navigation Bar
 * @param {state} props.page
 * @param {state setter} props.setPage
 * @param {state setter} props.setPrevPage
 * @returns {component} NavBar
 */
export default function NavBar(props) {

    // Go to TimeClockCard
    const toTimeClock = () =>{

        props.setPage("timeClock"); 
        props.setPrevPage(props.page);

    }

    // Go to HabitListCard
    const toHabits = () =>{

        props.setPage("habits"); 
        props.setPrevPage(props.page);

    }

    // Go to GoalListCard
    const toGoals = () =>{

        props.setPage("goals"); 
        props.setPrevPage(props.page);

    }
    
    return(
        <div id = "NavBar">
            <img className = "logoImage" src = "../public/progressivityLogo.png"></img>
            <Button className = "navButton" text = "time clock" onclick = {toTimeClock}/>
            <Button className = "navButton" text = "habits" onclick = {toHabits}/>
            <Button className = "navButton" text = "goals" onclick = {toGoals}/>
        </div>
    )
}