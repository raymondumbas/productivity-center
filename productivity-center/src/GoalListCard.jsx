import { useState } from 'react'
import Button from './Button.jsx'
import { updateGoal } from './utilities.jsx';
import './GoalListCard.css'
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
                <div className = "goalElement" key = {index} onClick = {displayGoalDetails}>
                        <span className = "goalElementName">{goal}</span>
                        <span className = "goalElementSuccess">{success}</span>
                        <span className = "goalElementDescription">{goalStatus["habit"] + " " + goalStatus["metric"]}</span>
                </div>
            )
        });

        return(
            <div className = "goalListCard">
                <Button className = "createNewButton" text = "+" onclick = {showNewGoal} />
                <div className = "cardTitle">Your Goals</div>
                {goalElements}
            </div>
            )
    }

    else if(view == "details"){
        const goalStatus = updateGoal(displayGoal);
        let statusOverview = [];
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
            const percentage = (goalStatus["completion"][0]/goalStatus["amount"])*100
            statusOverview.push(
                <div>{percentage + "% completed"}</div>
            );
        }

        else if(goalStatus["metric"] === "Per Day"){
            const goalAmount = goalStatus["amount"];
            const perDayDisplay = goalStatus["dates"].map((date,index) => {

                const currentCompletion = goalStatus["completion"][index];
                const currentPercentage = (currentCompletion/goalAmount)*100

                return(
                    <div className = "statusOverviewDay" key = {index}>
                        <div>{date + ": "}</div>
                        <div>{currentCompletion + "/" + goalAmount + "  (" + currentPercentage.toFixed(2) + "%)  "}</div>
                    </div>
                )

            });

            statusOverview.push(perDayDisplay);
        }

        // Calculate progress of goal
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