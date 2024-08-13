// Import React Hooks
import { Component, useState } from 'react'
import { updateGoal } from './utilities.jsx';

// Import React Components
import Button from './Button.jsx'

// Import Styles
import './GoalListCard.css'

/**
 * Formatted gallery and details display of all 
 * created goals with data about goal progress
 * @param {*} props
 * @returns {component} GoalListCard
 */
export default function GoalListCard(props){

    // React Hooks
    const [view, setView] = useState("gallery");
    const [displayGoal, setDisplayGoal] = useState("");


    /**
     * Switch from Goal List Card to New Goal Card
     * @param {} none
     * @returns {} void
     */
    const showNewGoal = () =>{

        // Save Previous Page
        props.setPrevPage("goals");

        // Go to New Goal Card
        props.setPage("newGoal")
    }

    /**
     * Delete target goal from all relevant localStorage items
     * @param {} none
     * @returns {} void
     */
    const deleteGoal = () =>{

        // Retrieve goalList from localStorage
        const goalList = JSON.parse(localStorage.getItem("goalList"));

        // Find index of the target goal
        const index = goalList.indexOf(displayGoal);

        // If goal was found, remove from goalList
        if(index > -1){
            goalList.splice(index,1);
        }

        // Update "goalList" from localStorage with target goal removed
        localStorage.setItem("goalList", JSON.stringify(goalList));

        // Remove target goal item form localStorage
        localStorage.removeItem(displayGoal);

        // Go to gallery view
        setView("gallery");
    }

    // Display all goals with brief details
    if(view == "gallery"){

        // Retrieve goalList from localStorage
        const goalList = JSON.parse(localStorage.getItem("goalList"));

        // Create HTML elements for each goal and details
        const goalElements = goalList.map((goal,index) => {
    
            /**
             * When a goal is clicked, go to its details page
             * @param {} none
             * @returns {} void 
             */
            const displayGoalDetails = () =>{

               setDisplayGoal(goal);
               setView("details");
               
            }
            
            // Update completion of goal
            const goalStatus = updateGoal(goal);
            
            // Update success status of goal
            let success;
            if(goalStatus["success"]){

                success = "Success";
                
            }
            else{

                success = "Not succeeded";

            }

            // Return current goal's tags
            return(

                <div className = "goalElement" key = {index} onClick = {displayGoalDetails}>
                        <span className = "goalElementName">{goal}</span>
                        <span className = "goalElementSuccess">{success}</span>
                        <span className = "goalElementDescription">{goalStatus["habit"] + " " + goalStatus["metric"]}</span>
                </div>

            )
        });

        // Gallery View Output
        return(

            <div className = "goalListCard">
                <Button className = "createNewButton" text = "+" onclick = {showNewGoal} />
                <div className = "cardTitle">Your Goals</div>
                {goalElements}
            </div>

        )
    }

    // Display the details of a single goal
    else if(view == "details"){

        // Update completion of goal
        const goalStatus = updateGoal(displayGoal);

        // List for completion of goal
        let statusOverview = [];

        // List for details of goal
        let goalDetails = [];

        // Display goal metric
        goalDetails.push(
            <div>{goalStatus["metric"] + " Based"}</div>
        );

        // Display habit the goal is about
        goalDetails.push(
            <div>{"Habit: " + goalStatus["habit"]}</div>
        );

        // Display goal success
        if(goalStatus["success"]){

            goalDetails.push(
                <div>Goal Completed</div>
            );

        }
        else{

            goalDetails.push(
                <div>Goal Not Completed</div>
            );

        }

        // Display completion
        if(goalStatus["metric"] === "Duration"){

            //Calculate percentage of completion over the duration of the goal
            const percentage = (goalStatus["completion"][0]/goalStatus["amount"])*100;

            statusOverview.push(

                <div>{percentage + "% completed"}</div>

            );
        }

        // Goal is measured Per Day
        else if(goalStatus["metric"] === "Per Day"){

            // Get the daily target amount
            const goalAmount = goalStatus["amount"];

            // Create HTML elements for each day of the goal's completion
            const perDayDisplay = goalStatus["dates"].map((date,index) => {

                // Get current day
                const currentCompletion = goalStatus["completion"][index];

                // Calculate percentage of current day's completion
                const currentPercentage = (currentCompletion/goalAmount)*100

                // Output of current day's goal completion
                return(

                    <div className = "statusOverviewDay" key = {index}>
                        <div>{date + ": "}</div>
                        <div>{currentCompletion + "/" + goalAmount + "  (" + currentPercentage.toFixed(2) + "%)  "}</div>
                    </div>

                )

            });

            statusOverview.push(perDayDisplay);

        }

        // Output of Goal List Card
        return(
            <div className = "goalListCard">
                <div className = "goalDetailsButtons">
                    <Button text = "<-" onclick = {() => setView("gallery")}/>
                    <Button text = "🗑️" onclick = {() => deleteGoal()}/>
                </div>
                <div className = "cardTitle" >{displayGoal}</div>
                <div className = "goalDetails">{goalDetails}</div>
                <div className = "statusOverview" >{statusOverview}</div>
            </div>
            )
    }
}