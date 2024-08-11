import Button from './Button.jsx'
import './NavBar.css'

export default function NavBar(props) {

    const toTimeClock = () =>{

        props.setPage("timeClock"); 
        props.setPrevPage(props.page);

    }

    const toHabits = () =>{

        props.setPage("habits"); 
        props.setPrevPage(props.page);

    }

    const toGoals = () =>{

        props.setPage("goals"); 
        props.setPrevPage(props.page);

    }
    return(
        <div id = "NavBar">
            <Button text = "time clock" onclick = {toTimeClock}/>
            <Button text = "habits" onclick = {toHabits}/>
            <Button text = "goals" onclick = {toGoals}/>

        </div>
    )
}