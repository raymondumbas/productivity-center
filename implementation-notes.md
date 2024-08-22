App <br>
| <br>
+-- Navbar<br>
|      +-- Link (Habit)<br>
|      +-- Link (Habit)<br>
|      +-- Link (Habit)<br>
+-- homeClock<br>
|      +-- Button (start)<br>
|      +-- Button (stop)<br>
|      +-- TimeDate<br>
+-- homeHabits<br>
|      +-- Link (Habit)<br>
|      +-- Link (Habit)<br>
|      +-- Link (Habit)<br>
+-- homeGoals<br>
|      +-- Button (left)<br>
|      +-- Button (right)<br>
|      +-- currentGoal<br>

---

# localStorage Structure

List of Habits
Key: "habitList"
Value: {JSON.stringify([array of habit names])}

Habit Item
Key: habitName 
Value:
{

	name: habitName
	metric: time/count
	description: string
	log: 
		Time Based = [Date object, Date object, number (seconds)] 
		Count Based = [Date object, number (count)]
	
}

Time Habit Daily Totals
Key: habitNameDays
Value:
[

	"type": habit metric
	"date": total metric
	"date": total metric
	"date": total metric
	
]
- Date = today.toDateString()

List of Past Goals
Key: "goalListPast"
Value: {JSON.stringify([array of goal names])}

List of Active Goals
Key: "goalListActive"
Value: {JSON.stringify([array of goal names])}

List of Future Goals
Key: "goalListFuture"
Value: {JSON.stringify([array of goal names])}

Goal Item
Key: "goal"+goalName
Value:
{

	habit: habitName
	start: Date 
	end: Date
	metric: "Per Day"/ "Duration"
	completion: [num,num,num] / [num]
	amount: number of seconds/counts
	
}

---
# Time Clock Behavior 
## States
noHabitSelected
- hide buttons/count
- display only habit select

countHabit
- display habit select, count, and "done" button

timeHabitInactive
- display habit select, 00:00:00 clock, "start" button

timeHabitActive
- display habit select, current clock, "update" and "stop" buttons

## time based habit
Once a habit log has started, it cannot stop unless it is being stopped to be finalized, i.e. you cannot start and stop the same log. "Starting" again will create a new log.

If the latest log is active then display "update" and "stop" buttons. Update will update the display to show how much time has been displayed. Currently, I don't want a continuously updating display (might implement it later). 

If the latest log is not active, it will just display "start". Once start is hit then it will create a new active log and behave as stated above because the latest log will then be active.

## Time Clock Value
The amount of time displayed on the time clock will be calculated by taking how much time has passed since the Date object stored in that habit's log.

By doing it this way, rather than keeping a clock stored in the current session's memory, so that the user can close out of the app and the habit will still be tracking. This can be useful for habits that may take a long time but still want to be tracked.

---
# Goal Behavior
## Status Changes

Can never happen:
- Past -> Present/Future 
- Past/Present -> Future

Can happen (need to update completion)
- Present -> Past
- Future -> Present
- Future -> Past

## Goal Metric
### Per Day
- Goal Completion is measured as array of numbers corresponding to the counts/seconds for each day of the duration.
- Goal Success will be determined by: amount of days completed/total amount of days
- Goal Amount will be the number per day
### Duration
- Goal Completion is measured as a number corresponding to the count/seconds so far for the entire duration
- Goal Success will be determined by: amount of count or seconds/total goal amount
- Goal Amount will be the number for the whole duration

---
# Other Decisions

## Parent -> Child, State vs Ref
When passing a value from the parent that I want to be changed in the child, I used ref for the New Habit Card to create a new habit in storage and state for the Time Clock Card to change the what the card UI displays.

For a new habit I want all of the input fields to be filled before re-rendering/submitting the info, so I used ref to ensure unwanted re-rendering

For the time clock display, I wanted the UI to change every single time the user picks a new habit. So that requires a re-render every time a value is changed so I used state.