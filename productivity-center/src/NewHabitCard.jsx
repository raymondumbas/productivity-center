import { useState } from 'react'
import {useRef} from 'react'
import {useEffect} from 'react'
import InputField from './InputField.jsx'
import Button from './Button.jsx'

export default function NewHabitCard(props) {
    //References
    const habitNameRef = useRef(null)
    const metricRef = useRef(null)
    const descriptionRef = useRef(null)

    //Functions
    const createNewHabit = () =>{
        let name = habitNameRef.current?.value;
        let metric = metricRef.current?.checked; 
        let description = descriptionRef.current?.value;

        if(name != undefined && metric != undefined && description != undefined){
            let habitList = JSON.parse(localStorage.getItem("habitList"));

            //Habit Name Already Exists
            if(habitList.includes(name)){
                console.log("Habit name already exists.");
                return;
            }

            //New Habit
            habitList.push(name);
            localStorage.setItem("habitList", JSON.stringify(habitList)); //Add habitName to habitList
            let newHabit = {
                "name": name,
                "metric": (metric ? "time" : "count"),
                "description": description,
                "log": [], //Time = [startTime, endTime], Count = [date, count]
                "total": 0
            };
            localStorage.setItem(name, JSON.stringify(newHabit)); //Create new habit item

            console.log("New Habit Created:", newHabit)

            //Initialize Days Item
            localStorage.setItem(name+"Days",JSON.stringify({"metric":newHabit["metric"]}));
            

            habitNameRef.current.value = "";
            metricRef.current.checked = false;
            descriptionRef.current.value = "";

            props.setPage(props.prevPage);
            props.setPrevPage("newHabit");
            
        }
    }


    return (
        <>
            Create New Habit <br></br>
            <InputField name = "Habit Name:" type = "text" ref = {habitNameRef}/>
            <InputField name = "Timed?" type = "checkbox" ref = {metricRef}/><br></br>
            <InputField name = "Description" type = "textarea" ref = {descriptionRef}/>
            <Button text = "+" onclick = {createNewHabit}/>
        </>
    )
}