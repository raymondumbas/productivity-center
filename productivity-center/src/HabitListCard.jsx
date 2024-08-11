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

        // Remove habit from localStorage
        localStorage.removeItem(displayHabit);
        localStorage.removeItem(displayHabit+"Days");
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

        // Get habitDays
        let habitDays = JSON.parse(localStorage.getItem(displayHabit + "Days"));
    

        if(currentHabit.metric == "time"){
            const startTime = new Date(targetLog[0]);
            const endTime = new Date(targetLog[1]);

            const logTime = (endTime.getTime() - startTime.getTime())/1000;
            currentHabit.total = oldTotal - logTime;

            const oldDayTotal = habitDays[endTime.toDateString()];
            habitDays[endTime.toDateString()] = oldDayTotal - logTime;
        }
        else if(currentHabit.metric == "count"){
            
            currentHabit.total = oldTotal - targetLog[1];

            const oldDayTotal = habitDays[targetLog[0]];
            habitDays[endTime.toDateString()] = oldDayTotal - targetLog[1];

        }

        // Update habitDays
        localStorage.setItem(displayHabit + "Days", JSON.stringify(habitDays));

        // Update habit
        localStorage.setItem(displayHabit, JSON.stringify(currentHabit));

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

        // Create list of all logs for current habit
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

            // Return a single formatted log
            return(
                <div key = {index}>

                    <span>{zeroLogItem}</span>
                    <span>{oneLogItem}</span>
                    <span>{logUnits}</span>
                    <Button text = "🗑️" onclick = {() => deleteLog(currentHabit,log)}/>

                </div>
            )    
        });

        // Create weekly overview
        let weeklyOverview = [];
        let todayDate = new Date();
        const habitDays = JSON.parse(localStorage.getItem(displayHabit+"Days"));
        

        for(let i = 6; i >= 0; i--){
            
            console.log(todayDate)
            const dateString = todayDate.toDateString();
            const formattedString = (todayDate.getMonth() + 1) + "/" + todayDate.getDate() + "/" + String(todayDate.getFullYear()).slice(-2);
            // Logs for this day exist
            if(dateString in habitDays){
                weeklyOverview.unshift(
                    <div key = {i}>
                        <span>{formattedString}</span>
                        <span>{habitDays[dateString]}</span>
                    </div>
                );
            }

            // No logs for this day
            else{
                weeklyOverview.unshift(
                    <div key = {i}>
                        <span>{formattedString}</span>
                        <span>0</span>
                    </div>
                );
            }

            todayDate.setDate(todayDate.getDate() - 1);

        }


        return(
            <>
               <div>
                    <Button text = "<-" onclick = {() => setView("gallery")}/>
                    <span>{displayHabit}</span>
                    <Button text = "🗑️" onclick = {() => deleteHabit()}/>
                    {weeklyOverview}
                    {logElements}
                </div> 

                
            </>
        )
    }

}

