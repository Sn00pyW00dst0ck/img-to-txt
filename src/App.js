import './App.css';
import { useEffect, useState } from 'react';
import ImgTextCreator from './components/ImgTextCreator';
import ImgUploader from './components/ImgUploader';
import useImageData from './customHooks/useImageData';

const createImage = async (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', error => reject(error));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    }
);

function App() {
    //States for the img
    const [selectedImage, setSelectedImage] = useState(null);

    //Image Data States
    const [imgDimensions, setImgDimensions] = useState({width: null, height: null});
    const [imgPixels, setImgPixels] = useState(null);

    //const { imageDimensions, pixelData } = useImageData(selectedImage);

    //Update the img data
    useEffect(() =>  {
        //No file selected
        if (selectedImage == null || selectedImage === undefined)  {
            setImgDimensions({width: null, height: null});
            setImgPixels(null);
            return;
        }

        const ctx  = document.getElementById("HiddenCanvas").getContext('2d');
        const img = new Image();

        //Onload function fires once the image loads
        img.onload = () =>  {
            //Update the width and height
            const width = img.width;
            const height = img.height;
            setImgDimensions({width: width, height: height});

            //Draw the image to the hidden canvas (required to read the pixel data)
            document.getElementById("HiddenCanvas").width = width;
            document.getElementById("HiddenCanvas").height = height;
            ctx.drawImage(img, 0, 0, width, height);
            URL.revokeObjectURL(img.src);

            //Read the image pixels
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;    //data => [r,g,b,a,...]
            const pixels = [];
            for (let i = 0; i < data.length; i += 4) {
                pixels.push(data[i]);       //R
                pixels.push(data[i+1]);     //G
                pixels.push(data[i+2]);     //B
                pixels.push(data[i+3]);     //A
            }
            setImgPixels(pixels);
        }
        img.src = URL.createObjectURL(selectedImage);
    }, [selectedImage]);
    
    //console.log(imageDimensions);
    //console.log(pixelData);

    return (
        <div className="App">
            <canvas id="HiddenCanvas" style={{display: "none"}}></canvas>

            {/* Title Here */}

            <ImgUploader onSelectImageHandler={setSelectedImage}/>

            <ImgTextCreator 
                imageDimensions={imgDimensions}
                pixelData={imgPixels} />        
        </div>
    );
}

export default App;
