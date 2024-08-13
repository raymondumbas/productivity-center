// Import React Hooks
import {useRef} from 'react'
import {useState} from 'react'

// Import React Components
import InputField from './InputField.jsx'
import Button from './Button.jsx'

// Import Styles
import './NewGoalCard.css'


/**
 * Component for creating new goals
 * @param {state} props.prevPage
 * @param {state setter} props.setPrevPage
 * @param {state setter} props.setPage
 * @returns {} void
 */
export default function NewGoalCard(props) {
    
    // References
    const nameRef = useRef(null);
    const amountRef = useRef(null);
    const startRef = useRef(null);
    const endRef = useRef(null);

    // States
    const [habitSelect, setHabitSelect] = useState(null);
    const [metricSelect, setMetricSelect] = useState(null);

    /**
     * Create new goal based off of input vlaues
     * @returns {} void
     */
    const createNewGoal = () =>{

        // Select Inputs
        let habit = habitSelect;
        let metric = metricSelect; 

        // Inputs
        let name = nameRef.current?.value;
        let amount = amountRef.current?.value; 

        // Dates
        const today = new Date();
        let start = new Date(startRef.current?.value); 
        let endDate = endRef.current?.value; 

        // Extract year, month, day from endDate 
        const [year, month, day] = endDate.split('-').map(Number);

        // Set end date to midnight of that date
        let end = new Date(year,month-1, day, 23,59,59); 

        // If all inputs have a valid value
        if(name != "" && habit != "" && metric != "" && amount != "" && start != "Invalid Date" && end != "Invalid Date"){

             // Block new goal: Start Date takes place after End Date
            if(start > end){

                console.log("start date takes place after the end date")

            }

             // Block new goal:: end date has already passed
            else if(today > end){

                console.log("end date has already passed")
            
            }

            // Valid goal: creation
            else{

                // Get list of goal names from localStorage
                let goalList = JSON.parse(localStorage.getItem("goalList"));

                //Goal Name Already Exists
                if(goalList.includes(name)){
                    console.log("Goal name already exists.");
                    return;
                }

                // New Goal
                goalList.push(name);

                //Add goalName to goalList
                localStorage.setItem("goalList", JSON.stringify(goalList)); 

                // Create object for newGoal with all input values
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
                // Goal is currently active
                if(today > start ){

                    newGoal["status"] = "active";

                }

                // Goal has not started
                else if(today < start){

                    newGoal["status"] = "future";

                }

                //Create new goal item in localStorage
                localStorage.setItem(name, JSON.stringify(newGoal)); 

                console.log("New Goal Created:", newGoal)

                // Reset all input values
                nameRef.current.value = null;
                amountRef.current.value = null;
                startRef.current.value = null;
                endRef.current.value = null;

                setHabitSelect("null");
                setMetricSelect("null");

                // Go back to previous page
                props.setPage(props.prevPage);
                props.setPrevPage("newGoal");
            }
        }
    }

    // Get list of habits from localStorage
    const habitOptions = JSON.parse(localStorage.getItem("habitList"));

    // Options for metric select 
    const metricOptions = ["Per Day", "Duration"];

    // Return New Goal Card
    return (
        <div className = "newGoalCard">
            <div className = "cardTitle">Create New Goal</div>
           
            <InputField name = "Goal Name:" type = "text" ref = {nameRef}/>
            <div className = "newGoalCardGroup">
                <InputField name = "Habit:" type = "select" state = {habitSelect} stateSetter = {setHabitSelect} options = {habitOptions}/>
                <InputField name = "Metric:" type = "select" state = {metricSelect} stateSetter = {setMetricSelect} options = {metricOptions}/>
            </div>
            <InputField name = "Amount:" type = "number" ref = {amountRef}/>
            <div className = "newGoalCardGroup">
                <InputField name = "Start" type = "date" ref = {startRef}/>
                <InputField name = "End" type = "date" ref = {endRef}/>
            </div>
            <Button  className = "cardButton" text = "+" onclick = {createNewGoal}/>
        </div>
    )
}