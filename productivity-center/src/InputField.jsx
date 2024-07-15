export default function InputField(props) {

    //Textarea    
    if(props.type == "textarea"){
        return(
            <>
                <label htmlFor = {props.name}>{props.name}</label>
                <textarea name = {props.name} id = {props.name}></textarea>
            </>
        )

    }
    //Input
    else{
        return (
            <>
                <label htmlFor = {props.name}>{props.name}</label>
                <input type = {props.type} name = {props.name} id = {props.name}></input>
            </>
        )
    }

}