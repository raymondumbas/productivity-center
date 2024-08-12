import Button from './Button.jsx'
import { useState } from 'react'
import './HabitListCard.css'

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

            currentHabit.total = oldTotal - targetLog[2];

            habitDays[targetLog[0]] = habitDays[targetLog[0]] - targetLog[2];
        }
        else if(currentHabit.metric == "count"){
            
            currentHabit.total = oldTotal - targetLog[1];

            const oldDayTotal = habitDays[targetLog[0]];
            habitDays[targetLog[0]] = habitDays[targetLog[0]] - targetLog[1];

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
                <div className = "habitElement" key = {index} onClick = {displayHabitDetails}>
                        <span className = "habitElementName">{habit}</span>
                        <span className = "habitElementTotal">{currentHabit.total}</span>
                        <span className = "habitElementDescription"> {currentHabit.description}</span>
                </div>
            )    
        });

        return(
            <div className = "habitListCard">
                <Button className = "createNewButton" text = "+" onclick = {showNewHabit}  title = "Create New Habit"/>
                <div className = "cardTitle">Your Habits</div>
                <div className = "habitElementsContainer">
                    {habitElements}
                </div>
                
            </div>
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
                    logUnits = log[2];
                }
            }

            else if (currentHabit.metric == "count"){
                zeroLogItem = log[0];
                oneLogItem = "";
                logUnits = log[1];
            }

            // Return a single formatted log
            return(
                <div className = "habitLog" key = {index}>
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
                    <div className = "weeklyOverviewDay" key = {i}>
                        <div>{formattedString}</div>
                        <div>{habitDays[dateString]}</div>
                    </div>
                );
            }

            // No logs for this day
            else{
                weeklyOverview.unshift(
                    <div className = "weeklyOverviewDay" key = {i}>
                        <div>{formattedString}</div>
                        <div>0</div>
                    </div>
                );
            }

            todayDate.setDate(todayDate.getDate() - 1);

        }


        return(
            <>
               <div className = "habitListCard">
                    <div className = "habitDetailsButtons">
                        <Button text = "←" onclick = {() => setView("gallery")}/>
                        <Button text = "🗑️" onclick = {() => deleteHabit()}/>
                    </div>
                    <div className = "cardTitle">{displayHabit}</div>
                    <div className = "weeklyOverview">{weeklyOverview}</div>
                    <div className = "logElements">{logElements}</div>
                </div> 

                
            </>
        )
    }

}

