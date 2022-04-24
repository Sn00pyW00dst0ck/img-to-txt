import React, { useState } from "react";
import styles from "./ImgUploader.module.css";

const ImgUploader = ({ onSelectImageHandler }) =>  {
    const [uploadedImage, setUploadedImage] = useState(null);

    return (
        <>
        <div className={styles.ImgUploaderContainer}>
                <div className={styles.ImgUploaderContent}>
                    {/* Use conditional rendering to show different states? */}
                    <div className={styles.PreviewContent}>
                        <img id="ImagePreview" src="" alt=""></img> 

                        <div className={styles.ButtonContainer}>
                        <label className={styles.CustomFileInput}>
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={(event) => {
                                    console.log(event.target.files[0]);
                                    //Update the preview Field
                                    const img  = document.getElementById("ImagePreview");
                                    img.src = URL.createObjectURL(event.target.files[0]);
                                    //Call the prop change (maybe move this to a button??)
                                    setUploadedImage(event.target.files[0]);
                                }
                            }/>
                            Upload An Image
                        </label>

                        <div 
                            className={styles.SubmitButton} 
                            onClick={() => { 
                                onSelectImageHandler(uploadedImage); 
                            }
                        }>
                            Submit
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ImgUploader;