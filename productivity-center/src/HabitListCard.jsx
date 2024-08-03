import Button from './Button.jsx'
import { useState } from 'react'
 
export default function HabitListCard(props) {
    const [view, setView] = useState("gallery");
    const [displayHabit, setDisplayHabit] = useState("");

    console.log(view)
    console.log(displayHabit)

    const deleteHabit = () =>{
        console.log("trash");
    }

    const deleteLog = () => {

    }

    if(view == "gallery"){
    const showNewHabit = () =>{
        props.setPrevPage("habits");
        props.setPage("newHabit")

    }
        const habitList = JSON.parse(localStorage.getItem("habitList"));
        const habitElements = habitList.map((habit,index) => {
            const currentHabit = JSON.parse(localStorage.getItem(habit));
    
            const displayHabitDetails = () =>{
               setDisplayHabit(habit);
               setView("details");
            }
    
            return(
                <div key = {index} onClick = {displayHabitDetails}>
                        <span>{habit}</span>
                        <span>{currentHabit.total}</span>
                        <span>{currentHabit.description}</span>
                </div>
            )    
        });

        return(
            <>
                <Button text = "+" onclick = {showNewHabit} />
                {habitElements}
            </>
            )
    }

    else if(view == "details"){
        const currentHabit = JSON.parse(localStorage.getItem(displayHabit));
        const logElements = currentHabit.log.map((log,index) => {

            let logTime;
            let endTime;
            const startTime = (new Date(log[0])).getTime();

            if(log[1] != null){
                endTime = (new Date(log[1])).getTime();
                logTime = (endTime - startTime)/1000;
            }
            return(
                <div key = {index}>
                        <span>{startTime}</span>
                        <span>{endTime}</span>
                        <span>{logTime}</span>
                        <span>🗑️</span>
                </div>
            )    
        });
        return(
            <>
               <div>
                    <Button text = "<-" onclick = {() => setView("gallery")}/>
                    <span>{displayHabit}</span>
                    <Button text = "🗑️" onclick = {deleteHabit}/>
                    {logElements}
                </div> 
            </>
        )
    }

}

