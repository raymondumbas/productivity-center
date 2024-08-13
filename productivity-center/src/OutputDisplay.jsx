/**
 * Return formatted display
 * @param {string} props.className
 * @param {string} props.text
 * @returns {component} OutputDisplay
 */
export default function OutputDisplay(props){
    return( 
        <div className = {props.className}>{props.text}</div>
    )
}