import React, { useEffect, useState } from "react";
import styles from "./ImgTextCreator.module.css";

//A constant string used for the conversion of pixels to ASCII characters
const densityString = "██▓▓▒▒░░::..   ";

//A mapping function to convert a value from one range to another
const scale = (number, inMin, inMax, outMin, outMax) => (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;

const ImgTextCreator = (props) =>  {
    //State for the text displayed by this component
    const [text, setText] = useState("");

    //Fires whenever the props of this component change
    useEffect(() =>  {
        //Handle Null Props
        if (props.imageDimensions.width == null || 
            props.imageDimensions.height == null || 
            props.pixelData === undefined)  { return; }
        
        //Density Mapping For New Text
        let newText = "";
        for (let i = 0; i < props.imageDimensions.height; i++)  {
            for (let j = 0; j < props.imageDimensions.width; j++)  {
                const pixelIndex = (j + i * props.imageDimensions.width) * 4;

                const avg = (props.pixelData[pixelIndex] + props.pixelData[pixelIndex+1] + props.pixelData[pixelIndex+2]) / 3;
                const charIdx = scale(avg, 0, 255, 0, densityString.length);

                const char = densityString.charAt(charIdx);
                newText += char;
            }
            newText += '\n';
        }
        setText(newText);
    }, [props.imageDimensions, props.pixelData]);

    return (
        <>
            <p className={styles.TextDisplay}>{text}</p>
        </>
    );
}

export default ImgTextCreator;