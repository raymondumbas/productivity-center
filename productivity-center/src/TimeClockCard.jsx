import { useState } from 'react'
import {useRef} from 'react'
import {useEffect} from 'react'
import Button from './Button.jsx'
import OutputDisplay from './OutputDisplay.jsx'

export default function TimeClockCard(){
    let description = "Example description change later";
    const [currentTime, setCurrentTime] = useState("");

    const checkTime = (i) => {
        if (i < 10) {i = "0" + i}  // add zero in front of numbers < 10
            return i;
    }
    const startTime = () => {
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        let newTime =  h + ":" + m + ":" + s;
        setCurrentTime(newTime);
        setTimeout(startTime, 1000);
    }

    useEffect( () => {
        startTime();
    },[currentTime]);


    return( 
        <>
            <OutputDisplay text = {currentTime} />
            <Button text = "Start"/>
            <Button text = "Stop"/>
            <OutputDisplay text = {description}/>
        </>
    )
}