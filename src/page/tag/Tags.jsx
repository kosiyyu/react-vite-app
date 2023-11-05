import axios from "axios"
import { useEffect, useState } from "react"
import { TAGS_DOWNLOAD_URL, TAG_UPLOAD_URL } from "../../global"
import { Link } from "react-router-dom"
import TagRedirect from "../../components/TagRedirect"
import ButtonCorrect from "../../components/buttons/ButtonCorrect"
import { applicationJson } from "../../headers/headers"
import toast from "react-hot-toast"

const displayErrorToast = (msg) => toast.error(msg)
const displaySuccessToast = (msg) => toast.success(msg)

function Tags(){
    const [tags, setTags] = useState(undefined)
    const [value, setValue] = useState("")
    const [isLoading, setIsLoadind] = useState(false)

    useEffect(()=>{
        axios.get(TAGS_DOWNLOAD_URL)
        .then(response => {
            console.log("SUCESS")
            setTags(response.data)
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

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoadind(x => !x)
        if(!value || /^\s*$/.test(value)){
            setValue("")
            setIsLoadind(x => !x)
            displayErrorToast("Tag cannot be empty or blank.")
            return
        }
        axios.post(TAG_UPLOAD_URL, {value: value}, applicationJson)
        .then(response => {
            setValue("")
            setIsLoadind(x => !x)
            displaySuccessToast(response.data)
            /////////////////
            // re-fetch all tags
            /////////////////
        })
        .catch(error => {
            setIsLoadind(x => !x)
            displayErrorToast(error.response.data)
        })
    }

    const handleValue = (e) => {
        setValue(e.target.value)
    }

    function displayButtonCorrect(){
        if(isLoading)
            return <ButtonCorrect ariaBusy={true} ariaLabel="Please wait…" />
        return <ButtonCorrect type="submit">Send</ButtonCorrect>
    }

    return (
        <div className="container">
            <hgroup>
                <h1>Tags</h1>
                <h2>Welcome! Examine and manage your content with <kbd>tags</kbd>.</h2>
            </hgroup>
            <hr />
            <h3>Add tag</h3>
                <form onSubmit={handleSubmit}>
                    <label>Tag name</label>
                    <input type="text" value={value} onChange={handleValue}/>
                    {displayButtonCorrect()}           
                </form>
            <h3>Tag list</h3>
            {displayTags()}
        </div>
    )
}

export default Tags