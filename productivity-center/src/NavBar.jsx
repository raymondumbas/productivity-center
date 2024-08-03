import Button from './Button.jsx'

export default function NavBar(props) {

    const toTimeClock = () =>{

        props.setPage("timeClock"); 
        props.setPrevPage(props.page);

    }

    const toHabits = () =>{

        props.setPage("habits"); 
        props.setPrevPage(props.page);

    }
    return(
        <>
            <Button text = "time clock" onclick = {toTimeClock}/>
            <Button text = "habits" onclick = {toHabits}/>
        </>
    )
}