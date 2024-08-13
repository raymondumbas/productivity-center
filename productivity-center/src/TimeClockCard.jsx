// Import React Hooks
import { useState } from 'react'
import {useEffect} from 'react'

// Import React Components
import Button from './Button.jsx'
import OutputDisplay from './OutputDisplay.jsx'
import InputField from './InputField.jsx'

// Import styles
import './TimeClockCard.css'

/**
 * Get new logs for habits with metric measurements
 * @param {state setter} setPrevPage
 * @param {state setter} setPage
 * @returns {component} TimeClockCard
 */
export default function TimeClockCard(props){
    // Get list of habits from localStorage
    let habitList = JSON.parse(localStorage.getItem("habitList"))

     // React States
    const [description, setDescription] = useState("");
    const [habitSelect, setHabitSelect] = useState("");
    const [clock, setClock] = useState("");
    const [count, setCount] = useState(0);
    const [habitState, setHabitState] = useState("noHabitSelected");


    // Get current habit
    useEffect(() => {
        if(habitSelect){

            // Get habit from local storage
            let currentHabit = JSON.parse(localStorage.getItem(habitSelect));

            // Habit has existing logs
            if(!(currentHabit.log.length===0)){
                
                // Get the latest log for the current habit
                const latestLog = currentHabit.log[0];

                // Current Habit is count based
                if(currentHabit.metric == "count"){

                    // Get the date of the latest log
                    const latestHabitDate = latestLog[0];

                    // Get today's date
                    const todayDate =  new Date().toDateString();

 
                    // Count for today already exists
                    if(latestHabitDate == todayDate){

                        setHabitState("countHabitActive");
                    }

                    // No count for today yet
                    else{

                        setHabitState("countHabitInactive");

                    }
                }


                // Current Habit is time based
                else if (currentHabit.metric == "time" ){

                    // Habit has an active log (i.e. has no end time)
                    if(latestLog.length === 1){
                        
                        setHabitState("timeHabitActive");

                    }

                    // Habit does not have an active log 
                    //(i.e. latest log has start AND end time)
                    else if(latestLog.length === 3){

                        setHabitState("timeHabitInactive");

                    }

                }
            
            }

            // No existing logs
            else{
                
                setHabitState(currentHabit.metric + "HabitInactive")
            }

        }
      }, [habitSelect]);
    
    // Setup current state
    useEffect( () => {

        if(habitSelect){

            // Get Selected Habit from Local Storage
            let currentHabit = JSON.parse(localStorage.getItem(habitSelect));

            // Initialize related states based on the habit state
            switch (habitState){

                // Count based habits
                case "countHabitActive":

                    setCount(currentHabit.log[0][1]);

                break;

                case "countHabitInactive":

                    setCount(0);

                break;

                // Time based habits
                case "timeHabitInactive":

                    setClock("0.00");

                break;

                case "timeHabitActive":

                    // Get the start date of the habit
                    let startDate = new Date(currentHabit.log[0][0]); 
                   
                    // Get the current date
                    let currentDate = new Date(); 

                    // Calculate how much time the habit has been active
                    let timePassed = (currentDate.getTime() - startDate.getTime())/1000;

                    // Initialize the clock
                    setClock(Number(timePassed.toFixed(2)))

                break;
            }

            // Initialize the current habit's description
            setDescription(currentHabit.description);

        }

        // No value for habitSelect
        else{
            
           setHabitState("noHabitSelected")
        }
    }, [habitState, habitSelect]);


    /**
     * Increment the count for a count based habit
     * @returns {} void
     */
    const updateCount = () =>{
        let currentHabit = JSON.parse(localStorage.getItem(habitSelect));
        const today = new Date();
        // No logs for today yet
        if(habitState == "countHabitInactive"){

            // Create count log for today
            const addedTodayLog = currentHabit.log
            

            addedTodayLog.unshift([today.toDateString(),0]);

            currentHabit = {
                ... currentHabit,
                "log": addedTodayLog
            }

            setHabitState("countHabitActive");
        }

        // Update count
        const newCount = Number(count) + 1;
        setCount(newCount);

        // Update count in log
        currentHabit.log[0][1] = newCount;

        //Update total in habit
        const  currentTotal =  Number(currentHabit.total);
        currentHabit.total = currentTotal + 1;

        console.log(currentHabit)
        localStorage.setItem(habitSelect, JSON.stringify(currentHabit));

        // Update in habitDays
        //Today's total already exists
        const habitDays = JSON.parse(localStorage.getItem(habitSelect + "Days"));
        
        if (today.toDateString() in habitDays){

            // Previous total time for today
            const oldDayCount = habitDays[today.toDateString()];

            // Update with new total
            habitDays[today.toDateString()] = oldDayCount + 1;

        }
        
        // Today's total has not been started
        else{

            // Create new key with today's date and current total
            habitDays[today.toDateString()] = currentHabit.total;

        }

        //Update localStorage todaysDate item
        localStorage.setItem(habitSelect+"Days", JSON.stringify(habitDays));
    };

    /**
     * Start a new log for a time based habit
     * @returns {} void
     */
    const startTime = () =>{

        // Get Current Habit from localStorage
        let currentHabit = JSON.parse(localStorage.getItem(habitSelect));
      

        // Current Habit is time based with no active logs
        if(habitState == "timeHabitInactive"){

            // Get current time to start habit
            let currentTime = new Date();

            // Create a new log with the current time
            const updatedLog = currentHabit.log
            updatedLog.unshift([currentTime])
        
            // Create updated habit with the updated logs
            const updatedHabit = {
                ...currentHabit,
                "log": updatedLog
            };

            // Update localStorage with updated habit
            localStorage.setItem(habitSelect, JSON.stringify(updatedHabit));

            // Habit is now active
            setHabitState("timeHabitActive");
        }
    }
   
    /**
     * Complete an active log for a time based habit
     * @returns {} void
     */
    const stopTime = () => {

        // Get currentHabit from localStorage
        let currentHabit = JSON.parse(localStorage.getItem(habitSelect));

        // Get the logs of the currentHabit
        let habitLogs = currentHabit.log;

        if(habitState == "timeHabitActive"){

            // Get the most recent log
            let currentLog = habitLogs[0];

            // Get current time
            const endTime = new Date();
            const todaysDate = endTime.toDateString();

            // Update current log with current time as end time
            currentLog.push(endTime);

            // Increment total time
            const startTime = new Date(currentLog[0]);

            // Calculate new addition in time
            let finalTime = ((endTime.getTime() - startTime.getTime())/1000);
            finalTime = Number(finalTime.toFixed(2));

            // Get the old time total
            const oldTotal = currentHabit.total;

            // Get today's total for that habit in localStorage
            const habitDays = JSON.parse(localStorage.getItem(habitSelect+"Days"));

            //Today's total already exists
            if (todaysDate in habitDays){

                // Previous total time for today
                const oldDayTime = habitDays[todaysDate];

                // Update with new total
                let newTime = oldDayTime + finalTime
                habitDays[todaysDate] = Number(newTime.toFixed(2));
            }

            // Today's total has not been started
            else{

                // Create new key with today's date
                habitDays[todaysDate] = finalTime;

            }

            //Update localStorage todaysDate item
            localStorage.setItem(habitSelect+"Days", JSON.stringify(habitDays));

            // Update current log with the time for the finished log
            currentLog.push(finalTime);

            // Update log with new latest log
            habitLogs[0] = currentLog;

            // Update total in habit
            currentHabit.total = oldTotal + finalTime;

            // Update logs in habit
            const updatedHabit = {
                ...currentHabit,
                "log": habitLogs
            }

            // Update habit in localStorage
            localStorage.setItem(habitSelect, JSON.stringify(updatedHabit))

            // Habit is now not active
            setHabitState("timeHabitInactive");
        }
    }

    /**
     * Update the display of time passed for an active habit
     * @returns {} void
     */
    const updateTime = () =>{

        // Get current habit from localStorage
        let currentHabit = JSON.parse(localStorage.getItem(habitSelect));

        // Get the starting time of the most recent log
        let startDate = new Date(currentHabit.log[0][0]); 

        // Get the current time
        let currentDate = new Date();

        // Calculate how much time has passed since the starting time
        let timePassed = (currentDate.getTime() - startDate.getTime())/1000;

        // Update the clock state with the time that has passed
        setClock(Number(timePassed.toFixed(2)))
    }
    
    /**
     * Go to the NewHabitCard page
     * @returns {} void
     */
    const showNewHabit = () =>{

        props.setPrevPage("timeClock");
        props.setPage("newHabit")

    }

    // Return TimeClockCard based on the current selected habit's state
    switch(habitState){

        // Initial Case
        case "noHabitSelected":
            return( 
                <div className = "timeClockCard">  
                    <Button className = "createNewButton" text = "+" onclick = {showNewHabit} title = "Create New Habit" />
                    <InputField name = "Habit Name" type = "select" default = "Choose habit here" state = {habitSelect} stateSetter = {setHabitSelect} options = {habitList}/>
                </div >
            )
        

        // Selected habit is count based
        case "countHabitActive":
        case "countHabitInactive":

            const currentDate = new Date().toDateString();

            return( 
                <div className = "timeClockCard">  
                    <Button className = "createNewButton" text = "+" onclick = {showNewHabit} title = "Create New Habit"/>
                    <InputField  name = "Habit Name" type = "select" default = "Choose habit here" state = {habitSelect} stateSetter = {setHabitSelect} options = {habitList}/>
                    <OutputDisplay className = "timeClockDate" text = {currentDate} />
                    <OutputDisplay className = "timeClockMetric" text = {count}/>
                    <OutputDisplay className = "timeClockDescription" text = {description}/>
                    <Button className = "cardButton" text = "Done" onclick = {updateCount}/>

                </div>
            ) 
        
        // Selected habit is time based
        case "timeHabitInactive":
            return(
                <div className = "timeClockCard">
                    <Button className = "createNewButton" text = "+" onclick = {showNewHabit} title = "Create New Habit"/>
                    <InputField name = "Habit Name" type = "select" default = "Choose habit here" state = {habitSelect} stateSetter = {setHabitSelect} options = {habitList}/>
                    <OutputDisplay className = "timeClockMetric" text = {clock} />
                    <OutputDisplay className = "timeClockDescription" text = {description}/>
                    <Button className = "cardButton" text = "Start" onclick = {startTime} />
                </div>
            )
        
        case "timeHabitActive":
            return( 
                <div className = "timeClockCard">  
                    <Button className = "createNewButton" text = "+" onclick = {showNewHabit} title = "Create New Habit" />
                    <InputField name = "Habit Name" type = "select" default = "Choose habit here" state = {habitSelect} stateSetter = {setHabitSelect} options = {habitList}/>
                    <OutputDisplay className = "timeClockMetric" text = {clock + "s"} />
                    <OutputDisplay className = "timeClockDescription" text = {description}/>
                    <Button className = "cardButton" text = "Update" onclick = {updateTime} />
                    <Button className = "cardButton" text = "Stop" onclick = {stopTime}/>
                </div>
            ) 
    }
}