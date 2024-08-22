# Features

## Habit Tracker
#HabitTracker
- Function: allow users to create habits that are tracked by  <u>user input</u> when they do the habit
- User Input: look at time clock 
	- time based habits (i.e. read for 1 hour a day) 
	- completion based habits (i.e. eat vitamins every day) 
- habit format: {task} {duration} {frequency}

## Goal Setter
#GoalSetter
- Function:  sets a deadline for a habit for a certain amount of time
	- i.e. achieve 70% of a habit over 2 weeks
- when goal is set, date is recorded so that end time (e.x. 2 weeks after) is calculated
	- when goal is approaching end time, goal is marked as "Due Soon"

## Time Clock
#TimeClock
- Function: user input to track progress of habits
- Types of input:
	- time based
		- "start task" = log start time
		- "end task" = log end time
	- completion based
		- "did this" = logs that task was completed for that day

---
# Pages

## Home Page
The home page will serve as the central hub for the time clock, goals, and habits as a way for the user to easily access
- time clock
- next due goal
	- if next goal is "due soon" then add more to display
- bookmarked habits

## Features Pages'
each feature will have its own page where it will display more information than the home page
- time clock
	- larger buttons
	- log of past punches
- goal
	- list all goals
	- where the user can CRUD goals
	- bookmark goals
- habits
	- list all habits
	- where user can create tasks and habits
	- bookmark habits
