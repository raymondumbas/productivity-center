// Import React Hooks
import { useState } from 'react'

// Import React Components
import Button from './Button.jsx'

// Import Styles
import './HabitListCard.css'

/**
 * Display list of habits and habit details
 * @param {state setter} props.setPage
 * @param {state setter} props.setPrevPage
 * @returns {} void
 */
export default function HabitListCard(props) {

    // State for gallery or details view
    const [view, setView] = useState("gallery");

    // Current habit
    const [displayHabit, setDisplayHabit] = useState("");

    /**
     * Delete target habit
     * @returns {} void
     */
    const deleteHabit = () =>{

        // Get habitList from localStorage
        const habitList = JSON.parse(localStorage.getItem("habitList"));
        
        // Find index of target habit
        const index = habitList.indexOf(displayHabit);

        // If habit is found, remove form habitList
        if(index > -1){
            habitList.splice(index,1);
        }
       
        // Update habitList of localStorage
        localStorage.setItem("habitList", JSON.stringify(habitList));

        // Remove habit item from localStorage
        localStorage.removeItem(displayHabit);

        // Remove habitDays item form localStorage
        localStorage.removeItem(displayHabit+"Days");

        // Go back to gallery view
        setView("gallery");
    }

    /**
     * Delete target log
     * @param {object} currentHabit
     * @param {object} props.setPrevPage
     * @returns {} void
     */
    const deleteLog = (currentHabit, targetLog) => {

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
    
        // Target Habit is time based
        if(currentHabit.metric == "time"){

            // Update Current Habit total
            currentHabit.total = oldTotal - targetLog[2];

            // Update Habit's Day total
            habitDays[targetLog[0]] = habitDays[targetLog[0]] - targetLog[2];

        }

        // Target Habit is count based
        else if(currentHabit.metric == "count"){
            
            // Update Current Habit total
            currentHabit.total = oldTotal - targetLog[1];

            // Update Habit's Day total
            habitDays[targetLog[0]] = habitDays[targetLog[0]] - targetLog[1];

        }

        // Update habitDays
        localStorage.setItem(displayHabit + "Days", JSON.stringify(habitDays));

        // Update habit
        localStorage.setItem(displayHabit, JSON.stringify(currentHabit));

    }

    // Display list of existing habits
    if(view == "gallery"){

        /**
         * Go to NewHabitCard
         * @returns {} void
         */
        const showNewHabit = () =>{

            // Save current page as previous
            props.setPrevPage("habits");

            // Go to NewHabitCard
            props.setPage("newHabit")

        }

        // Get habitList from localStorage
        const habitList = JSON.parse(localStorage.getItem("habitList"));

        // Create HTML elements for each habit
        const habitElements = habitList.map((habit,index) => {

            // Get currentHabit item from localStorage
            const currentHabit = JSON.parse(localStorage.getItem(habit));
    
            /**
             * Go to details view
             * @returns {} void
             */
            const displayHabitDetails = () =>{

                // Set displayHabit to the habit that was clicked on
               setDisplayHabit(habit);

               // Go to details view
               setView("details");

            }
    
            // Return current habit with details
            return(
                <div className = "habitElement" key = {index} onClick = {displayHabitDetails}>
                        <span className = "habitElementName">{habit}</span>
                        <span className = "habitElementTotal">{currentHabit.total}</span>
                        <span className = "habitElementDescription"> {currentHabit.description}</span>
                </div>
            )    
        });

        // Return HabitListCard
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

    // Details view of a single habit
    else if(view == "details"){

        // Get currentHabit from localStorage
        const currentHabit = JSON.parse(localStorage.getItem(displayHabit));

        // Create list of all logs for current habit
        const logElements = currentHabit.log.map((log,index) => {

            let logUnits;
            let zeroLogItem;
            let oneLogItem;


            // CurrentHabit is time based
            if(currentHabit.metric == "time"){
    
                // Get Start Date
                zeroLogItem = (new Date(log[0])).toLocaleString();
    
                // Habit is inactive (end date exists)
                if(log[1] != null){

                    // Get End Date
                    oneLogItem = (new Date(log[1])).toLocaleString();

                    // Get amount from this log
                    logUnits = log[2];

                }
            }

            // CurrentHabit is count based
            else if (currentHabit.metric == "count"){

                // Get Date
                zeroLogItem = log[0];

                // Not used for count based habit
                oneLogItem = "";

                // Get amount from this log
                logUnits = log[1];

            }

            // Return a single formatted log
            return(
                <div className = "habitLog" key = {index}>
                    <span>{zeroLogItem}</span> -
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
        
        // Loop through past 7 days
        for(let i = 6; i >= 0; i--){
            
            // Get the current date
            const dateString = todayDate.toDateString();

            // Current date as mm/dd/yy format
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

            // Advance to next day
            todayDate.setDate(todayDate.getDate() - 1);

        }

        // Return HabitListCard
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

