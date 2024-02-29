import React, { useState, useEffect } from 'react';

const FileTable = () => {
    const [files, setFiles] = useState([]);

    // Fetch files from the database (replace this with your actual database fetching logic)
    useEffect(() => {
        // Your database fetching logic here...
        // For demonstration purposes, I'll initialize some sample data
        const sampleFiles = [
            { id: 1, name: 'Document.pdf', size: '2 MB', type: 'PDF', lastModified: '2024-02-29' },
            { id: 2, name: 'Image.jpg', size: '1.5 MB', type: 'JPEG', lastModified: '2024-02-28' },
            // Add more sample files as needed
        ];
        setFiles(sampleFiles);
    }, []);

    return (
        <table className="file-table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Taille</th>
                    <th>Type</th>
                    <th>Dernière modification</th>
                </tr>
            </thead>
            <tbody>
                {files.map(file => (
                    <tr key={file.id}>
                        <td>{file.name}</td>
                        <td>{file.size}</td>
                        <td>{file.type}</td>
                        <td>{file.lastModified}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FileTable;
