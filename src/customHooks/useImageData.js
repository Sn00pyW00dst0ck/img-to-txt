import React, { useEffect, useState } from "react";

const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', error => reject(error));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    }
);

const useImageData = (image) =>  {
    const [imageDimensions, setImageDimensions] = useState({width: null, height: null});
    const [pixelData, setPixelData] = useState([]);

    useEffect(()=>  {
        if (image == null || image === undefined)  {
            setImageDimensions({width: null, height: null});
            setPixelData(null);
            return;
        }

        const ctx  = document.getElementById("HiddenCanvas").getContext('2d');
        const img = new Image();

        img.onload = () =>  {
            const width = img.width;
            const height = img.height;
            setImageDimensions({width: width, height: height});
            document.getElementById("HiddenCanvas").width = width;
            document.getElementById("HiddenCanvas").height = height;

            ctx.drawImage(img, 0, 0, width, height);
            URL.revokeObjectURL(img.src);

            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;
            //data => [r,g,b,a,...]
            const pixels = [];
            for (let i = 0; i < data.length; i += 4) {
                pixels.push(data[i]);
                pixels.push(data[i+1]);
                pixels.push(data[i+2]);
                //pixels.push(data[i+3]) for alpha
            }
            console.log(pixels);
        
        
        }
        img.src = image;
    }, [image]);

    return { imageDimensions, pixelData };
}

export default useImageData;