// Import React Hooks
import {useRef} from 'react'

// Import React Components
import InputField from './InputField.jsx'
import Button from './Button.jsx'

// Import Styles
import './NewHabitCard.css'

/**
 * Get details from inputs to create a new Habit
 * @param {state} prevPage
 * @param {state setter} setPrevPage
 * @param {state setter} setPage
 * @returns {component} NewHabitCard
 */
export default function NewHabitCard(props) {

    //References
    const habitNameRef = useRef(null)
    const metricRef = useRef(null)
    const descriptionRef = useRef(null)

    /**
     * Create new habit and update localStorage
     * @returns {} void
     */
    const createNewHabit = () =>{

        // Get habit details from input
        let name = habitNameRef.current?.value;
        let metric = metricRef.current?.checked; 
        let description = descriptionRef.current?.value;

        // If all habit details are filled in
        if(name != undefined && metric != undefined && description != undefined){

            // Get list of habits from localStorage
            let habitList = JSON.parse(localStorage.getItem("habitList"));

            // Habit Name Already Exists
            if(habitList.includes(name)){
                console.log("Habit name already exists.");
                return;
            }

            // Add new habit name to list of habits
            habitList.push(name);

            // Update habitList in localStorage
            localStorage.setItem("habitList", JSON.stringify(habitList)); 

            // Create object of new habit with related details
            let newHabit = {
                "name": name,
                "metric": (metric ? "time" : "count"),
                "description": description,
                "log": [], //Time = [startTime, endTime], Count = [date, count]
                "total": 0
            };

            // Create new habit item in localStorage
            localStorage.setItem(name, JSON.stringify(newHabit)); 

            //Initialize Days Item
            localStorage.setItem(name+"Days",JSON.stringify({"metric":newHabit["metric"]}));
            
            // Reset habit input values
            habitNameRef.current.value = "";
            metricRef.current.checked = false;
            descriptionRef.current.value = "";

            // Go back to the previous page
            props.setPage(props.prevPage);
            props.setPrevPage("newHabit");
            
        }
    }

    // Return New Habit Card
    return (
        <div className = "newHabitCard">
            <div className = "cardTitle"> Create New Habit</div>
            <InputField className = "create" name = "Habit Name:" type = "text" ref = {habitNameRef}/>
            <InputField name = "Timed?" type = "checkbox" ref = {metricRef}/><br></br>
            <InputField name = "Description" type = "textarea" ref = {descriptionRef}/>
            <Button className = "cardButton"text = "+" onclick = {createNewHabit}/>
        </div>
    )
}