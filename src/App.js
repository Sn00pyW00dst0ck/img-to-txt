import styles from './App.module.css';
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
        <div className={styles.App}>
            <canvas id="HiddenCanvas" style={{display: "none"}}></canvas>

            {/* Title Here */}
            <h1 className={styles.App_Title}>
                Image To <span className={styles.monospace}>Text</span>
            </h1>
            <h2 className={styles.App_Subtitle}>Upload an image to have it converted to ASCII characters</h2>
            <p className={styles.App_Description}>An application by Gabriel Aldous</p>

            <ImgUploader onSelectImageHandler={setSelectedImage}/>

            <ImgTextCreator 
                imageDimensions={imageDimensions}
                pixelData={pixelData} />        
        </div>
    );
}

export default App;
