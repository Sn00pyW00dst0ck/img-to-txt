import './App.css';
import { useState } from 'react';
import ImgTextCreator from './components/ImgTextCreator';
import ImgUploader from './components/ImgUploader';
import useImageData from './customHooks/useImageData';


function App() {
    //State for the selected image File object
    const [selectedImage, setSelectedImage] = useState(null);

    //Image Data States
    const { imageDimensions, pixelData } = useImageData(selectedImage);

    return (
        <div className="App">
            <canvas id="HiddenCanvas" style={{display: "none"}}></canvas>

            {/* Title Here */}
            <h1>Image To Text</h1>

            <ImgUploader onSelectImageHandler={setSelectedImage}/>

            <ImgTextCreator 
                imageDimensions={imageDimensions}
                pixelData={pixelData} />        
        </div>
    );
}

export default App;
