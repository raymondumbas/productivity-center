import { useState } from 'react'
import {useEffect} from 'react'
import Button from './Button.jsx'
import OutputDisplay from './OutputDisplay.jsx'
import InputField from './InputField.jsx'

export default function TimeClockCard(props){
    //----------------Variables----------------
    let habitList = JSON.parse(localStorage.getItem("habitList"))

     //----------------Hooks----------------
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

            console.log("new currentHabit:",currentHabit);
            // Habit has existing logs
            if(!(currentHabit.log.length===0)){
                
                const latestLog = currentHabit.log[0];

                if(currentHabit.metric == "count"){
                    const latestHabitDate = latestLog[0];
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

                else if (currentHabit.metric == "time" ){

                    // Habit has an active log (i.e. has no end time)
                    if(latestLog.length === 1){
                        
                        setHabitState("timeHabitActive");

                    }

                    // Habit does not have an active log 
                    //(i.e. latest log has start AND end time)
                    else if(latestLog.length === 2){

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


            switch (habitState){
                case "countHabitActive":

                    setCount(currentHabit.log[0][1]);

                break;

                case "countHabitInactive":

                    setCount(0);

                break;
                case "timeHabitInactive":

                    setClock("0.00");

                break;

                case "timeHabitActive":
                
                    let startDate = new Date(currentHabit.log[0][0]); //Time listed in the log
                    console.log(startDate);
                    let currentDate = new Date(); //right now
                    let timePassed = (currentDate.getTime() - startDate.getTime())/1000;
                    setClock(timePassed)

                break;
            }

            setDescription(currentHabit.description);
            console.log('habit retrieved:',currentHabit)
            console.log("habit state:",habitState)
        }
        else{
           setHabitState("noHabitSelected")
        }
    }, [habitState, habitSelect]);


    //----------------Functions----------------

    /**
      * Update the count from current habit
      * 
      * Pre-reqs: Habit must be count-based
     */
    const updateCount = () =>{
        let currentHabit = JSON.parse(localStorage.getItem(habitSelect));
        
        // No logs for today yet
        if(habitState == "countHabitInactive"){

            // Create count log for today
            const addedTodayLog = currentHabit.log
            const today = new Date();

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

    };

    /**
     * Create a new log for the current habit
     * 
     * Pre-reqs: 
     * - Habit must be time-based
     * - Habit must not have an active log (i.e. all logs must have a start and end time)
     */
    const startTime = () =>{
        let currentHabit = JSON.parse(localStorage.getItem(habitSelect));
      
        if(habitState == "timeHabitInactive"){
            console.log("HERE")
            // Get current time to start habit
            let currentTime = new Date();

            //Update log
            const updatedLog = currentHabit.log
            updatedLog.unshift([currentTime])
            console.log(updatedLog);

            // Create updated habit with the current time
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
     * Update active log from current habit with an end time
     * 
     * Pre-reqs: 
     * - Habit must be time-based
     * - Habit must have an active log (i.e. latest log is missing an end time)
     */
    const stopTime = () => {
        let currentHabit = JSON.parse(localStorage.getItem(habitSelect));
        let habitLogs = currentHabit.log;

        if(habitState == "timeHabitActive"){

            let currentLog = habitLogs[0];
            const endTime = new Date();
            // Update current log with current time as end time
            currentLog.push(endTime);

            // Update log with new latest log
            habitLogs[0] = currentLog;

            // Increment total time
            const startTime = new Date(currentLog[0]);

            // Calculate new addition in time
            const finalTime = (endTime.getTime() - startTime.getTime())/1000;
            const oldTotal = currentHabit.total;

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
     * Update clock of current habit
     * 
     * Pre-reqs: 
     * - Habit must be time-based
     * - Habit must have an active log (i.e. latest log is missing an end time)
     */
    const updateTime = () =>{

        let currentHabit = JSON.parse(localStorage.getItem(habitSelect));

        let startDate = new Date(currentHabit.log[0][0]); //Time listed in the log
        console.log(startDate);
        let currentDate = new Date(); //right now
        let timePassed = (currentDate.getTime() - startDate.getTime())/1000;
        setClock(timePassed)
    }

    /**
     * Bring up New Habit Card from Time Clock
     * 
     * Pre-reqs: 
     *  n/a
     */

    const showNewHabit = () =>{

        props.setPrevPage("timeClock");
        props.setPage("newHabit")

    }
    //----------------Return Statements----------------
    switch(habitState){
        case "noHabitSelected":
            return( 
                <>  
                    <Button text = "+" onclick = {showNewHabit} />
                    <InputField name = "Habit Name" type = "select" default = "Choose habit here" state = {habitSelect} stateSetter = {setHabitSelect} options = {habitList}/>
                </>
            )
        
        case "countHabitActive":
        case "countHabitInactive":

            const currentDate = new Date().toDateString();

            return( 
                <>  
                    <Button text = "+" onclick = {showNewHabit} />
                    <InputField name = "Habit Name" type = "select" default = "Choose habit here" state = {habitSelect} stateSetter = {setHabitSelect} options = {habitList}/>
                    <OutputDisplay text = {currentDate} />
                    <OutputDisplay text = {count}/>
                    <OutputDisplay text = {description}/>
                    <Button text = "Done" onclick = {updateCount}/>

                </>
            ) 
        
        case "timeHabitInactive":
            return(
                <>
                    <Button text = "+" onclick = {showNewHabit} />
                    <InputField name = "Habit Name" type = "select" default = "Choose habit here" state = {habitSelect} stateSetter = {setHabitSelect} options = {habitList}/>
                    <OutputDisplay text = {clock} />
                    <OutputDisplay text = {description}/>
                    <Button text = "Start" onclick = {startTime} />
                </>
            )
        
        case "timeHabitActive":
            return( 
                <>  
                    <Button text = "+" onclick = {showNewHabit} />
                    <InputField name = "Habit Name" type = "select" default = "Choose habit here" state = {habitSelect} stateSetter = {setHabitSelect} options = {habitList}/>
                    <OutputDisplay text = {clock} />
                    <OutputDisplay text = {description}/>
                    <Button text = "Update" onclick = {updateTime} />
                    <Button text = "Stop" onclick = {stopTime}/>
                </>
            ) 
    }
}