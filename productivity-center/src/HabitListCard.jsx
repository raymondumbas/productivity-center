export default function NewHabitCard(props) {
const habitList = JSON.parse(localStorage.getItem("habitList"));
let habitElements = []
habitList.forEach((habit) =>{
    const currentHabit = JSON.parse(localStorage.getItem(habit));
    habitElements.push(
        <>
            <span>{habit}</span>
        
        </>

    )
})

if(props.page == "home"){
    return(
    <>
        <div>Habits</div>
    </>
    )
}

else if(props.page == "habits"){
    return(
    <>
    
    </>
    )
}

return
<>
</>
}