import axios from "axios"
import { useEffect, useState } from "react"
import { TAGS_DOWNLOAD_URL } from "../../global"
import { Link } from "react-router-dom"

function Tags(){
    const [tags, setTags] = useState(undefined)

    useEffect(()=>{
        axios.get(TAGS_DOWNLOAD_URL)
        .then(response => {
            console.log("SUCESS")
            setTags(response.data)
            console.log(response.data)
        })
        .catch(error => {
            console.log(`ERROR | ${error}`)
        })
    }, [])

    function displayTags(){
        if(tags === undefined)
            return <p>Loading...</p> 
        return (
            <table role="grid">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Tag</td>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((tag, index) => (
                        <tr key={index}>
                            <td><Link to={`/tag/${tag.id}`}>{index + 1}</Link></td>
                            <td>{tag.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) 
    }

    return (
        <section>
            <h1>🏷️ Tags</h1>
            <h6><a onClick={() => console.log("click")}>:: add tag ::</a></h6>
            {displayTags()}
        </section>
    )
}

export default Tags