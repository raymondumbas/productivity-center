import { forwardRef } from "react";

/* INPUT FIELD COMPONENT
    Props:
    - name (string) = text label for the input
    -type (string) = what type of input

    Ref:
    - passed from parent to retrieve value of the field
*/


const InputField = forwardRef(function InputField(props,ref) {

    const handleChange = (e) => {
        if (props.type === "checkbox") {
            ref.current.checked = e.target.checked;
        } else {
            ref.current.value = e.target.value;
        }
    };

    //Textarea    
    if(props.type == "textarea"){
        return(
            <>
                <label htmlFor = {props.name}>{props.name}</label>
                <textarea name = {props.name} id = {props.name} onChange = {handleChange} ref = {ref} ></textarea>
            </>
        )

    }
    //Input
    else{
        return (
            <>
                <label htmlFor = {props.name}>{props.name}</label>
                <input type = {props.type} name = {props.name} id = {props.name} onChange = {handleChange} ref = {ref}></input>
            </>
        )
    }

});

export default InputField;