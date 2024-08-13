/**
 * Button Component
 * @param {*} props 
 * @returns {component} formatted button tag  
 */
export default function Button(props) {
    return (
        <button className = {props.className} title = {props.title} onClick={props.onclick}>{props.text}</button>
    )
}

  