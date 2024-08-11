import { useState } from 'react'
import Button from './Button.jsx'
import { updateGoal } from './utilities.jsx';

export default function GoalListCard(props){
    const [view, setView] = useState("gallery");
    const [displayGoal, setDisplayGoal] = useState("");


    const showNewGoal = () =>{
        props.setPrevPage("goals");
        props.setPage("newGoal")
    }

    const deleteGoal = () =>{

        //Remove from goalList
        const goalList = JSON.parse(localStorage.getItem("goalList"));
        const index = goalList.indexOf(displayGoal);

        if(index > -1){
            goalList.splice(index,1);
        }

        localStorage.setItem("goalList", JSON.stringify(goalList));
        localStorage.removeItem(displayGoal);
        setView("gallery");
    }

    if(view == "gallery"){

        const goalList = JSON.parse(localStorage.getItem("goalList"));
        const goalElements = goalList.map((goal,index) => {
    
            const displayGoalDetails = () =>{
               setDisplayGoal(goal);
               setView("details");
            }
            
            // Update status of time frame (past, active, future)
            const goalStatus = updateGoal(goal);
            console.log("Goal:", goal, "\nGoal Status:",goalStatus);
            
            let success;
            if(goalStatus["success"]){
                success = "Success";
            }
            else{
                success = "Not succeeded";
            }

            return(
                <div key = {index} onClick = {displayGoalDetails}>
                        <span>{goal}</span>
                        <span>{success}</span>
                </div>
            )
        });

        return(
            <>
                <h1>Your Goals</h1>
                <Button text = "+" onclick = {showNewGoal} />
                {goalElements}
            </>
            )
    }

    else if(view == "details"){
        const goalStatus = updateGoal(displayGoal);
        let statusDisplay = [];

        // Display goal metric
        statusDisplay.push(
            <div>{goalStatus["metric"] + " Based"}</div>
        );

        // Display habit the goal is about
        statusDisplay.push(
            <div>{"Habit: " + goalStatus["habit"]}</div>
        );

        // Display goal success
        if(goalStatus["success"]){
            statusDisplay.push(
                <div>Goal Completed</div>
            );
        }
        else{
            statusDisplay.push(
                <div>Goal Not Completed</div>
            );
        }

        // Display completion
        if(goalStatus["metric"] === "Duration"){
            const percentage = (goalStatus["completion"][0]/goalStatus["amount"])*100
            statusDisplay.push(
                <div>{percentage + "% completed"}</div>
            );
        }

        else if(goalStatus["metric"] === "Per Day"){
            const goalAmount = goalStatus["amount"];
            const perDayDisplay = goalStatus["dates"].map((date,index) => {

                const currentCompletion = goalStatus["completion"][index];
                const currentPercentage = (currentCompletion/goalAmount)*100

                return(
                    <div key = {index}>
                        <div>{date + ": "}</div>
                        <div>{currentCompletion + "/" + goalAmount + "  (" + currentPercentage.toFixed(2) + "%)  "}</div>
                    </div>
                )

            });

            statusDisplay.push(perDayDisplay);
        }

        // Calculate progress of goal
        return(
            <>
                <Button text = "<-" onclick = {() => setView("gallery")}/>
                {displayGoal}
                <Button text = "🗑️" onclick = {() => deleteGoal()}/>
                {statusDisplay}
              
            </>
            )
    }
}