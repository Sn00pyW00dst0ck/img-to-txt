import { useEffect, useState } from "react";

const useImageData = (image) =>  {
    //Some state for image data
    const [imageDimensions, setImageDimensions] = useState({width: null, height: null});
    const [pixelData, setPixelData] = useState(null);

    //Runs whenever the image parameter is updated
    useEffect(()=>  {
        //Return null when image is not passed / undefined / null
        if (image == null || image === undefined)  {
            setImageDimensions({width: null, height: null});
            setPixelData(null);
            return;
        }

        //Get the canvas and create an image object
        const ctx  = document.getElementById("HiddenCanvas").getContext('2d');
        const img = new Image();

        //This fires when the image object src loads in
        img.onload = () =>  {
            //Update the width and height
            const width = img.width;
            const height = img.height;
            setImageDimensions({width: width, height: height});

            //Draw the image to the hidden canvas (required to read the pixel data)
            document.getElementById("HiddenCanvas").width = width;
            document.getElementById("HiddenCanvas").height = height;
            ctx.drawImage(img, 0, 0, width, height);
            URL.revokeObjectURL(img.src);

            //Update the pixel data
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;    //data => [r,g,b,a,...]
            const pixels = [];
            for (let i = 0; i < data.length; i += 4) {
                pixels.push(data[i]);       //R
                pixels.push(data[i+1]);     //G
                pixels.push(data[i+2]);     //B
                pixels.push(data[i+3]);     //A
            }
            setPixelData(pixels);
        }
        img.src = URL.createObjectURL(image);
    }, [image]);

    return { imageDimensions, pixelData };
}

export default useImageData;