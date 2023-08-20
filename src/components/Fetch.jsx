import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function Fetch() {
    const [fetchedData, setFetchedData] = useState([]);

    useEffect(()=>{
        // axios.get('http://localhost:8081/api/v1/file/download/102')
        //     .then(response => {
        //         setFetchedData(response.data);
        //     })

        axios.get('https://jsonplaceholder.typicode.com/todos/')
            .then(response => {
                setFetchedData(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log('ERROR')
            })
    }, [])

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {fetchedData.map(i => (
                        <tr key={i.id}>
                            <td>{i.userId}</td>
                            <td>{i.id}</td>
                            <td>{i.title}</td>
                            <td>{i.completed ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Fetch