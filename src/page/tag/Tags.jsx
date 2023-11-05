import axios from "axios"
import { useEffect, useState } from "react"
import { TAGS_DOWNLOAD_URL } from "../../global"
import { Link } from "react-router-dom"
import TagRedirect from "../../components/TagRedirect"

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
                        <td>Id</td>
                        <td>Tag</td>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((tag, index) => (
                        <tr key={index}>
                            <td><Link to={`/tag/${tag.id}`}>{index + 1}</Link></td>
                            <td>{tag.id}</td>
                            <td><TagRedirect tagId={tag.id}>{tag.value ? tag.value : "null"}</TagRedirect></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) 
    }

    return (
        <div className="container">
            <hgroup>
                <h1>Tags</h1>
                <h2>Welcome! Examine and manage your content with <kbd>tags</kbd>.</h2>
            </hgroup>
            <hr />
            <h3>Add tag</h3>
                <form>
                    <label>Tag name</label>
                    <input type="text"/>
                    <button>Send</button>            
                </form>
            <h3>Tag list</h3>
            {displayTags()}
        </div>
    )
}

export default Tags