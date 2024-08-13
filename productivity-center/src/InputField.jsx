// Import React Hooks
import { forwardRef } from "react";
import { useState } from "react";

/**
* Return formatted Input Field Component
* @param {string} props.name
* @param {string} props.default
* @param {string} props.type
* @param {state setter} props.stateSetter
* @param {[string]} props.options
* @param {ref} ref
* @returns {component} Input Field Component
*/
const InputField = forwardRef(function InputField(props,ref) {

    // React Hooks
    const [value, setValue] = useState(props.default || "");

    /**
    * Handle Input Change
    * @param {event} e
    * @returns {} void
    * 
    * Update any relevant states or references
    * 
    */
    const handleChange = (e) => {

        // Input uses a reference
        if(ref){

            if (props.type === "checkbox") {

                ref.current.checked = e.target.checked;

            } 

            else {

                ref.current.value = e.target.value;

            }
        }
        
        // Input uses state
        else if(props.stateSetter){
            
            // Set local value state
            setValue(e.target.value);

            // Set parent state
            props.stateSetter(e.target.value);
            
        }
        
    };

    // Input is a Textarea    
    if(props.type == "textarea"){

        // Create textarea with label
        return(
            <>
                <label htmlFor = {props.name}>{props.name}</label>
                <textarea name = {props.name} id = {props.name} onChange = {handleChange} ref = {ref} value = {props.default} ></textarea>
            </>
        )

    }

    //Input is a Select
    else if(props.type == "select"){

        // Create option tags for each item in select
        const selectOptions = props.options.map((item, index) => (
            <option value={item} key={index}>
                {item}
            </option>
        ));

        // Create a default select option
        selectOptions.unshift(<option value = "" key = "" defaultValue>Select</option>)
        
        // Create select with label and options
        return (
            <>
                <label  htmlFor = {props.name}>{props.name}</label>
                <select  type = {props.type} name = {props.name} id = {props.name} onChange = {handleChange} ref = {ref} value = {value}>{selectOptions}</select>
            </>
        )
    }

    // All other input types
    else{

        // Create input with label
        return (
            <>
                <label htmlFor = {props.name}>{props.name}</label>
                <input type = {props.type} name = {props.name} id = {props.name} onChange = {handleChange} ref = {ref} value = {props.default} ></input>
            </>
        )
    }

});

export default InputField;