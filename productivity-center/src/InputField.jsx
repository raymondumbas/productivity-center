import { forwardRef } from "react";
import { useState } from "react";

/* INPUT FIELD COMPONENT
    Props:
    - name (string) = text label for the input
    - type (string) = what type of input

    Ref:
    - passed from parent to retrieve value of the field
*/


const InputField = forwardRef(function InputField(props,ref) {
    const [value, setValue] = useState(props.default || "");
    const handleChange = (e) => {
        

        if(ref){
            
            if (props.type === "checkbox") {
                ref.current.checked = e.target.checked;
            } else {
                ref.current.value = e.target.value;
            }
        }
        
        else if(props.stateSetter){
            
            setValue(e.target.value);

            props.stateSetter(e.target.value);
            
        }
        
    };

    //Textarea    
    if(props.type == "textarea"){
        return(
            <>
                <label htmlFor = {props.name}>{props.name}</label>
                <textarea name = {props.name} id = {props.name} onChange = {handleChange} ref = {ref} value = {props.default} ></textarea>
            </>
        )

    }
    //Select
    else if(props.type == "select"){
        const selectOptions = props.options.map((item, index) => (
            <option value={item} key={index}>
                {item}
            </option>
        ));

        selectOptions.unshift(<option value = "" key = "" defaultValue>Select</option>)
        
        return (
            <>
                <label htmlFor = {props.name}>{props.name}</label>
                <select type = {props.type} name = {props.name} id = {props.name} onChange = {handleChange} ref = {ref} value = {value}>{selectOptions}</select>
            </>
        )
    }

    //Input
    else{
        return (
            <>
                <label htmlFor = {props.name}>{props.name}</label>
                <input type = {props.type} name = {props.name} id = {props.name} onChange = {handleChange} ref = {ref} value = {props.default} ></input>
            </>
        )
    }

});

export default InputField;