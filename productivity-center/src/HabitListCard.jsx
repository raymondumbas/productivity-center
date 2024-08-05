import Button from './Button.jsx'
import { useState } from 'react'
 
export default function HabitListCard(props) {
    const [view, setView] = useState("gallery");
    const [displayHabit, setDisplayHabit] = useState("");

    console.log(view)
    console.log(displayHabit)

    const deleteHabit = () =>{

        //Remove from habitList
        const habitList = JSON.parse(localStorage.getItem("habitList"));
        console.log("before",habitList)
        const index = habitList.indexOf(displayHabit);
        if(index > -1){
            habitList.splice(index,1);
        }
        console.log("after",habitList)
        localStorage.setItem("habitList", JSON.stringify(habitList));
        localStorage.removeItem(displayHabit);
        setView("gallery");
    }

    const deleteLog = (currentHabit, targetLog) => {
        console.log(currentHabit)
        console.log(targetLog)
        
        // Find index of targetLog in habit log
        const index = currentHabit.log.indexOf(targetLog);

        // If targetLog found, then remove it
        if(index > -1){
            currentHabit.log.splice(index,1)
        }

        // Remove metric value from total
        const oldTotal = currentHabit.total;

        if(currentHabit.metric == "time"){
            const startTime = new Date(targetLog[0]);
            const endTime = new Date(targetLog[1]);

            const logTime = (endTime.getTime() - startTime.getTime())/1000;
            currentHabit.total = oldTotal - logTime;
        }
        else if(currentHabit.metric == "count"){
            
            currentHabit.total = oldTotal - targetLog[1];
        }

        //Update habit
        localStorage.setItem(displayHabit, JSON.stringify(currentHabit))

        

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
                <h1>Your Habits</h1>
                <Button text = "+" onclick = {showNewHabit} />
                {habitElements}
            </>
            )
    }

    else if(view == "details"){
        const currentHabit = JSON.parse(localStorage.getItem(displayHabit));
        const logElements = currentHabit.log.map((log,index) => {
            let logUnits;
            let zeroLogItem;
            let oneLogItem;
            if(currentHabit.metric == "time"){
    
                zeroLogItem = (new Date(log[0])).getTime();
    
                if(log[1] != null){
                    oneLogItem = (new Date(log[1])).getTime();
                    logUnits = (oneLogItem - zeroLogItem)/1000;
                }
            }

            else if (currentHabit.metric == "count"){
                zeroLogItem = log[0];
                oneLogItem = "";
                logUnits = log[1];
            }

            return(
                <div key = {index}>

                    <span>{zeroLogItem}</span>
                    <span>{oneLogItem}</span>
                    <span>{logUnits}</span>
                    <Button text = "🗑️" onclick = {() => deleteLog(currentHabit,log)}/>

                </div>
            )    
        });

        return(
            <>
               <div>
                    <Button text = "<-" onclick = {() => setView("gallery")}/>
                    <span>{displayHabit}</span>
                    <Button text = "🗑️" onclick = {() => deleteHabit()}/>
                    {logElements}
                </div> 

                
            </>
        )
    }

}

