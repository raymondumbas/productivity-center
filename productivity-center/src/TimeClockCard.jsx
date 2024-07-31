import { useState } from 'react'
import {useEffect} from 'react'
import { useRef } from 'react'
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

            // Habit is count-based
            if(!currentHabit.metric){

                setHabitState("countHabit");

            }

            // Habit is time-based
            else{

                // Habit has existing logs
                if(!currentHabit.log.length===0){

                    const latestLog = currentHabit.log[0];
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

                // Habit has no logs
                else{

                    //No current habits
                    setHabitState("timeHabitInactive");

                }
            }
        }
      }, [habitSelect]);
    
    // Setup current state
    useEffect( () => {
        if(habitSelect){

            // Get Selected Habit from Local Storage
            let currentHabit = JSON.parse(localStorage.getItem(habitSelect));


            switch (habitState){
                case "countHabit":

                    setCount(currentHabit.log);

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
    }, [habitState, habitSelect]);


    //----------------Functions----------------

    /**
      * Update the count from current habit
      * 
      * Pre-reqs: Habit must be count-based
     */
    const updateCount = () =>{
        let currentHabit = JSON.parse(localStorage.getItem(habitSelect));
        
        const newCount = Number(count) + 1;
        setCount(newCount);
        const updatedHabit = {
            ... currentHabit,
            "log": newCount
        }

        console.log(currentHabit)
        localStorage.setItem(habitSelect, JSON.stringify(updatedHabit));

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

            // Update current log with current time as end time
            currentLog.push(new Date());

            // Update habit with the updated logs
            habitLogs[0] = currentLog;
            const updatedHabit = {
                ...currentHabit,
                "log": habitLogs
            }

            // Update habit logs in localStorage
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

    //----------------Return Statements----------------
    switch(habitState){
        case "noHabitSelected":
            return( 
                <>  
                    <InputField name = "Habit Name" type = "select" default = "Choose habit here" state = {habitSelect} stateSetter = {setHabitSelect} options = {habitList}/>
                </>
            )
        
        case "countHabit":

            const currentDate = new Date().toDateString();

            return( 
                <>  
                    <InputField name = "Habit Name" type = "select" default = "Choose habit here" state = {habitSelect} stateSetter = {setHabitSelect} options = {habitList}/>
                    <OutputDisplay text = {currentDate} />
                    <OutputDisplay text = {count}/>
                    <Button text = "Done" onclick = {updateCount}/>
                    <OutputDisplay text = {description}/>
                </>
            ) 
        
        case "timeHabitInactive":
            return(
                <>
                    <InputField name = "Habit Name" type = "select" default = "Choose habit here" state = {habitSelect} stateSetter = {setHabitSelect} options = {habitList}/>
                    <OutputDisplay text = {clock} />
                    <Button text = "Start" onclick = {startTime} />
                    <OutputDisplay text = {description}/>
                </>
            )
        
        case "timeHabitActive":
            return( 
                <>  
                    <InputField name = "Habit Name" type = "select" default = "Choose habit here" state = {habitSelect} stateSetter = {setHabitSelect} options = {habitList}/>
                    <OutputDisplay text = {clock} />
                    <Button text = "Update" onclick = {updateTime} />
                    <Button text = "Stop" onclick = {stopTime}/>
                    <OutputDisplay text = {description}/>
                </>
            ) 
    }
}