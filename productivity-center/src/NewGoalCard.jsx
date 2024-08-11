import {useRef} from 'react'
import { useState } from 'react'
import InputField from './InputField.jsx'
import Button from './Button.jsx'

export default function NewGoalCard(props) {
    
    
    //References
    const nameRef = useRef(null);
    const amountRef = useRef(null);
    const startRef = useRef(null);
    const endRef = useRef(null);

    const [habitSelect, setHabitSelect] = useState(null);
    const [metricSelect, setMetricSelect] = useState(null);

    //Functions
    const createNewGoal = () =>{
        let name = nameRef.current?.value;
        let habit = habitSelect;
        let metric = metricSelect; 
        let amount = amountRef.current?.value; 
        let start = new Date(startRef.current?.value); 

        let endDate = endRef.current?.value; 
        const [year, month, day] = endDate.split('-').map(Number);
        let end = new Date(year,month-1, day, 23,59,59); // Set end date to midnight of that date

        const today = new Date();
        if(name != "" && habit != "" && metric != "" && amount != "" && start != "Invalid Date" && end != "Invalid Date"){
             // Start Date takes place after End Date
             console.log(typeof amount)
            if(start > end){

                console.log("start date takes place after the end date")

            }

            else if(today > end){

                console.log("end date has already passed")
            
            }

            else{

                let goalList = JSON.parse(localStorage.getItem("goalList"));

                //Goal Name Already Exists
                if(goalList.includes(name)){
                    console.log("Goal name already exists.");
                    return;
                }

                // New Goal
                goalList.push(name);
                localStorage.setItem("goalList", JSON.stringify(goalList)); //Add goalName to goalList

                let newGoal = {
                    "name": name,
                    "habit": habit,
                    "metric": metric,
                    "duration": [start,end],
                    "completion" : [],
                    "amount": amount,
                    "success" : false
                };


                // Check Status
                const today = new Date();
                // Goal is currently active
                if(today > start ){
                    newGoal["status"] = "active";
                }

                // Goal has not started
                else if(today < start){

                    newGoal["status"] = "future";

                }

                localStorage.setItem(name, JSON.stringify(newGoal)); //Create new goal item

                console.log("New Goal Created:", newGoal)

                nameRef.current.value = null;
                amountRef.current.value = null;
                startRef.current.value = null;
                endRef.current.value = null;

                setHabitSelect("null");
                setMetricSelect("null");

                props.setPage(props.prevPage);
                props.setPrevPage("newGoal");
            }
        }
    }

    const habitOptions = JSON.parse(localStorage.getItem("habitList"));
    const metricOptions = ["Per Day", "Duration"];
    return (
        <>
            Create New Goal <br></br>
            <InputField name = "Goal Name:" type = "text" ref = {nameRef}/>
            <InputField name = "Habit:" type = "select" state = {habitSelect} stateSetter = {setHabitSelect} options = {habitOptions}/>
            <InputField name = "Metric:" type = "select" state = {metricSelect} stateSetter = {setMetricSelect} options = {metricOptions}/>
            <InputField name = "Amount:" type = "number" ref = {amountRef}/>
            <InputField name = "Start" type = "date" ref = {startRef}/>
            <InputField name = "End" type = "date" ref = {endRef}/>
            <Button text = "+" onclick = {createNewGoal}/>
        </>
    )
}