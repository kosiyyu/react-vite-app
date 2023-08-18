import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function FileMetadata() {
    const [fetchedData, setFetchedData] = useState(null);
  
    useEffect(() => {
        axios.get('http://localhost:8081/api/v1/file/download/102')
        .then(response => {
            setFetchedData(response.data);
        })
        .catch(error => {
            console.log('ERROR: ' + error);
        });
    }, []);
  
    return (
        <>
            <h1>PDF</h1>
            {fetchedData ? 
            <iframe
                title={fetchedData.filename} src={`data:application/pdf;base64,${fetchedData.encodedByteArray}`}>
            </iframe>
            :
            "🔄🔄🔄"
            }
        </>
    );
  }
  
  export default FileMetadata;