/**
 * Update the completion status of the given goal
 * @param {string} goalName
 * @returns {object} dates, metric, habit, status, completion, amount, success
 */
export function updateGoal(goalName){

    // Get goal item from localStorage
    const goal = JSON.parse(localStorage.getItem(goalName));

    // Get habitDays list from localStorage
    const habitDays= JSON.parse(localStorage.getItem(goal.habit+"Days")); 

    // Create constants for each relevant date
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
    // Initialize currentDate
    let currentDate = new Date(start);

    // Loop through duration to get amount towards completion
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

        // Goal is measured per day
        if(goal.metric === "Per Day"){

            completion.push(currentAmount);
    
        }

        // Goal is measured during the whole duration
        else if (goal.metric === "Duration"){

            completion[0] += currentAmount;

        }

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Update completion and success of target goal
    goal["completion"] = completion;
    goal["success"] = completion.every(num => num >= goal.amount);

    // Update goal item in localStorage
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