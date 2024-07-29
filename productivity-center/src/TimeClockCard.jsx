import { useState } from 'react'
import {useEffect} from 'react'
import { useRef } from 'react'
import Button from './Button.jsx'
import OutputDisplay from './OutputDisplay.jsx'
import InputField from './InputField.jsx'

export default function TimeClockCard(){
    //----------------Variables----------------
    let habitList = JSON.parse(localStorage.getItem("habitList"))

     //----------------Hooks----------------
    const [metric, setMetric] = useState("time");
    const [description, setDescription] = useState("");
    const [habitSelect, setHabitSelect] = useState("");
    const [clock, setClock] = useState("");
    const [count, setCount] = useState(0);

    useEffect(() => {
        if(habitSelect){

            //Get habit from local storage
            let currentHabit = JSON.parse(localStorage.getItem(habitSelect));

            console.log("new currentHabit:",currentHabit);
            //Set information
            setMetric(currentHabit.metric ? "time" : "count");
            setDescription(currentHabit.description);
        }
      }, [habitSelect]);
    
    useEffect( () => {

        let currentHabit = JSON.parse(localStorage.getItem(habitSelect));
            console.log("metric set:",metric);
            //If time habit -> setup clock
            if(metric == "time"){

                //Current habit already has logs
                if(!currentHabit.log.length===0){
                    
                    //Get most recent habit (first in list)
                    const currentLog = currentHabit.log[0];

                    //Current log not finished
                    if(currentLog.length === 1){

                        let startDate = currentLog[0]; //Time listed in the log
                        let currentDate = new Date(); //right now
                        let timePassed = (currentDate.getTime() - startDate.getTime())/1000;
                        setClock(timePassed)
                    }

                    //Current log is finished
                    else{

                        setClock("0");

                    }
                }

                //Current habit has not logs
                else{

                    setClock("0");

                }
            }

            else if(metric == "count"){
                setCount(currentHabit.log);
                console.log("IN COUNT SETUP, COUNT = ",count)
            }
            console.log('habit retrieved:',currentHabit)
    }, [metric, habitSelect]);
    //----------------Functions----------------
    const updateCount = () =>{
        let currentHabit = JSON.parse(localStorage.getItem(habitSelect));
        
        const newCount = Number(count) + 1;
        setCount(newCount);
        const updatedHabit = {
            ... currentHabit,
            "log": newCount
        }
        localStorage.setItem(habitSelect, JSON.stringify(updatedHabit));

    };

    const startTime = () =>{
        let currentHabit = JSON.parse(localStorage.getItem(habitSelect));

        //Current Habit has logs
        if(!currentHabit.log.length===0){

        }

        //Current Habit has no logs
        else{

            //Create log starting from right now
            const newLog = [new Date()];

            //Add new log to 
        }
    };

    const stopTime = () => {
        let currentHabit = JSON.parse(localStorage.getItem(habitSelect));
        let habitLogs = currentHabit.log

        //Current Habit has logs
        if(!habitLogs.length===0){

            let currentLog = habitLogs[0];
            
            //Latest log is still active
            if(currentLog.length === 1){

                //Update current log with current time as end time
                currentLog.push(new Date());

                //Update habit with the updated logs
                habitLogs[0] = currentLog;
                const updatedHabit = {
                    ...currentHabit,
                    "log": habitLogs
                }

                //Update habit logs in localStorage
                localStorage.setItem(habitSelect, updatedHabit)
            }
        }
    }
    /*
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        setTimeout(startTime, 1000);
    */
      

    //----------------Return Statements----------------
    if(metric == "time"){
        return( 
            <>  
                <InputField name = "Habit Name" type = "select" default = "Choose habit here" state = {habitSelect} stateSetter = {setHabitSelect} options = {habitList}/>
                <OutputDisplay text = {clock} />
                <Button text = "Start"/>
                <Button text = "Stop"/>
                <OutputDisplay text = {description}/>
            </>
        )
    }

    if(metric == "count"){
        let today = new Date();
        let currentDate = today.toLocaleDateString();
        return( 
            <>  
                <InputField name = "Habit Name" type = "select" default = "Choose habit here" state = {habitSelect} stateSetter = {setHabitSelect} options = {habitList}/>
                <OutputDisplay text = {currentDate} />
                <OutputDisplay text = {count}/>
                <Button text = "Done" onclick = {updateCount}/>
                <OutputDisplay text = {description}/>
            </>
        ) 
    }

}