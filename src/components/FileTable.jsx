import React, { useState, useEffect } from 'react';
import { ref, listAll, getMetadata, deleteObject } from 'firebase/storage'; // Import Firebase Storage methods
import { storage } from '../firebase/config';

const FileTable = () => {
    const [files, setFiles] = useState([]);
    const [editedName, setEditedName] = useState('');

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const listRef = ref(storage); // Get reference to the root of Firebase Storage
                listAll(listRef)
                    .then(async (res) => {
                        const filesData = [];
                        for (const itemRef of res.items) {
                            const metadata = await getMetadata(itemRef);
                            const sizeFormatted = formatFileSize(metadata.size); // Format file size
                            const lastModified = new Date(metadata.updated);
                            const formattedLastModified = `${lastModified.getDate()} ${getMonthName(lastModified.getMonth())} ${lastModified.getFullYear()}`;
                            filesData.push({
                                id: metadata.name,
                                name: metadata.name,
                                size: sizeFormatted,
                                type: metadata.contentType.split('/')[1], // Extract "pdf" from "application/pdf"
                                lastModified: formattedLastModified,
                                isEditing: false // Add isEditing state for each file
                            });
                        }
                        setFiles(filesData);
                    }).catch((error) => {
                        console.error('Error listing files:', error);
                    });
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, []);

    // Function to get month name based on month number
    const getMonthName = (monthNumber) => {
        const months = ['jan', 'fev', 'mar', 'avr', 'mai', 'jun', 'jul', 'aou', 'sep', 'oct', 'nov', 'dec'];
        return months[monthNumber];
    };

    // Function to format file size
    const formatFileSize = (sizeInBytes) => {
        const KB = 1024;
        const MB = 1024 * KB;
        if (sizeInBytes >= MB) {
            return `${(sizeInBytes / MB).toFixed(2)} Mo`;
        } else if (sizeInBytes >= KB) {
            return `${(sizeInBytes / KB).toFixed(2)} Ko`;
        } else {
            return `${sizeInBytes} octets`;
        }
    };

    const handleEdit = (fileId) => {


        setFiles(files.map(file => {
            if (file.id === fileId) {
                return { ...file, isEditing: true };
            } else {
                return { ...file, isEditing: false }; // Close editing for other files
            }
        }));
    };

    const handleSave = (fileId) => {
        setFiles(files.map(file => {
            if (file.id === fileId) {
                return { ...file, isEditing: false, name: file.editedName };
            } else {
                return file;
            }
        }));
    };

    const handleInputChange = (fileId, value) => {
        setFiles(files.map(file => {
            if (file.id === fileId) {
                return { ...file, editedName: value };
            } else {
                return file;
            }
        }));
    };

    // Function to handle file deletion
    const handleDeleteFile = async (fileName) => {
        try {
            const fileRef = ref(storage, fileName);
            await deleteObject(fileRef);
            // Update the file list after deletion
            const updatedFiles = files.filter(file => file.name !== fileName);
            setFiles(updatedFiles);
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    return (
        <table className="file-table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Taille</th>
                    <th>Type</th>
                    <th>Dernière modification</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {files.map(file => (
                    <tr key={file.id}>
                        <td>
                            {file.isEditing ? (
                                <input
                                    type="text"
                                    placeholder={file.name}
                                    value={file.editedName}
                                    onChange={(e) => handleInputChange(file.id, e.target.value)}
                                />
                            ) : (
                                <span>{file.name}</span> // Use a span instead of input when not editing
                            )}
                        </td>
                        <td>{file.size}</td>
                        <td>{file.type}</td>
                        <td>{file.lastModified}</td>
                        <td>
                            {file.isEditing ? (
                                <button className="form-btn p-2 rounded bg-success" onClick={() => handleSave(file.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                                    </svg>
                                </button>
                            ) : (
                                <>
                                    <button className="form-btn p-2 rounded bg-warning" onClick={() => handleEdit(file.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </td>
                        <td>
                            <button className="form-btn p-2 rounded bg-danger" onClick={() => handleDeleteFile(file.name)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FileTable;
