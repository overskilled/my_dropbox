import React from 'react';
import FileTable from './FileTable';
import { storage } from '../firebase/config';
import { ref, uploadBytes } from "firebase/storage";


const AppContent = () => {

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        uploadFileToStorage(file);
    };

    const handleUploadButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const uploadFileToStorage = (file) => {

        // Create a storage reference
        const storageRef = ref(storage, file.name);

        // Upload file to Firebase Storage
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('File uploaded successfully!', snapshot);
            alert('File uploaded successfully!', snapshot);
            // Handle file upload success (e.g., update UI, fetch updated file list)
        }).catch((error) => {
            console.error('Error uploading file:', error);
            // Handle file upload error
        });
    };


    return (
        <div className='appcontent'>

            <div className="btns"><input type="file" id="fileInput" onChange={handleFileSelect} style={{ display: 'none' }} />

                <button className="upload-btn" onClick={handleUploadButtonClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-plus" viewBox="0 0 16 16">
                        <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5z" />
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
                    </svg>
                    Upload File</button>
            </div>


            <div className="content-table">
                <FileTable />
            </div>

        </div>
    )
}

export default AppContent