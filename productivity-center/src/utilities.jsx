/* 
    Update Goal

*/
export function updateGoal(goalName){
    const goal = JSON.parse(localStorage.getItem(goalName));
    console.log(goalName)
    const habitDays= JSON.parse(localStorage.getItem(goal.habit+"Days"));
    const today = new Date();
    const start = new Date(goal.duration[0]);
    const end = new Date(goal.duration[1]);
        
    // Update the status of the goal
    // Past Habit 
    if(today > end){
        
        goal["status"] = "past";

    }

    // Active Habit
    else if(start < today && today < end){

        goal["status"] = "active";

    }
             
    // Future Habit
    else if(today < start){

        goal["status"] = "future";

    }

    // Update completion
    let currentDate = new Date(start); // Initialize currentDate

    // Loop through duration to get amount 
    let dates = [];
    let completion = [];
    while (currentDate <= end) {

        // Process the currentDate
        let currentAmount = habitDays[currentDate.toDateString()];
        dates.push(currentDate.toDateString());

        // No number for currentDate
        if(currentAmount === undefined){

            currentAmount = 0;

        }

        console.log("currentAmount", currentAmount)

        // Goal is measured per day
        if(goal.metric === "Per Day"){

            completion.push(currentAmount);
            console.log(completion)
        }

        // Goal is measured during the whole duration
        else if (goal.metric === "Duration"){

            completion[0] += currentAmount;

        }

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    goal["completion"] = completion;
    goal["success"] = completion.every(num => num >= goal.amount);

    localStorage.setItem(goalName, JSON.stringify(goal));

    // Return status and completion of goals
    return {
        "dates": dates,
        "metric": goal["metric"],
        "habit": goal["habit"],
        "status": goal["status"],
        "completion": goal["completion"],
        "amount": goal["amount"],
        "success" : goal["success"]
    }

} 