import InputField from './InputField.jsx'
export default function NewHabitCard(props) {
    return (
        <>
            Create New Habit
            <InputField name = "Habit Name:" type = "text"/>
            <InputField name = "Metric" type = "checkbox"/>
            <InputField name = "Description" type = "textarea"/>
            
        </>
    )
}