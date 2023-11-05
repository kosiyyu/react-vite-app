import PropTypes from "prop-types"
import TagDisplay from "../../components/TagDisplay"
import "../../css/custom.css"
import ButtonDelete from "../../components/buttons/ButtonDelete"
import ButtonEdit from "../../components/buttons/ButtonEdit"
import axios from "axios"
import { TAG_EDIT_URL, TAG_DELETE_URL } from "../../global"
import { useState } from "react"
import { applicationJson } from "../../headers/headers"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const displayErrorToast = (msg) => toast.error(msg)
const displayEditSuccess = (msg) => toast.success(msg)

Tag.propTypes = {
    tagData: PropTypes.object.isRequired
}
function Tag(props){
    const [tag, setTag] = useState(props.tagData)
    const [value, setValue] = useState(props.tagData.value)
    const [isLoading, setIsLoadind] = useState(false)
    const navigate = useNavigate()

    const handleValue = (e) => {
        setValue(e.target.value)
    }

    const handleEdit = (e) => {
        e.preventDefault()
        setIsLoadind(x => !x)
        const newTag = {...tag, value: value}
        axios.patch(TAG_EDIT_URL, newTag, applicationJson)
        .then(response => {
            setValue(newTag.value)
            setTag(newTag)  
            setIsLoadind(x => !x)
            displayEditSuccess(response.data)
        })
        .catch(error => {
            setIsLoadind(x => !x)
            displayErrorToast(error.response.data)
        })
    }

    const handleDelete = (e) => {
        e.preventDefault()
        
        setIsLoadind(x => !x)
        axios.delete(TAG_DELETE_URL(tag.id), applicationJson)
        .then(response => {
            setIsLoadind(x => !x)
            navigate("/tags")
            displayEditSuccess(response.data)
        })
        .catch(error => {
            setIsLoadind(x => !x)
            displayErrorToast(error.response.data)
        })
    }

    const handleReset = (e) => {
        e.preventDefault()
        setValue(tag.value)
    }

    function displayButtonEdit(){
        if(isLoading)
            return <ButtonEdit ariaBusy={true} ariaLabel="Please wait…" />
        return <ButtonEdit type="submit">Edit</ButtonEdit>
    }

    function displayButtonDelete(){
        if(isLoading)
            return <ButtonDelete ariaBusy={true} ariaLabel="Please wait…" />
        return <ButtonDelete onClick={handleDelete}>Delete</ButtonDelete>
    }

    function displayButtonReset(){
        if(isLoading)
            return <button aria-busy={true} aria-label="Please wait…"  />
        return <button type="reset" className="secondary">Reset</button>
    }
    
    function displayTag(){
        return (
            <div className="container">
                <hgroup>
                    <h1>Tag</h1>
                    <h2>Welcome! You can view and edit <TagDisplay>tag</TagDisplay> in here.</h2>
                </hgroup>
                <hr />
                <h3>Tag content</h3>
                <form onSubmit={handleEdit} onReset={handleReset}>
                    <label>Tag id</label>
                    <input type="text" value={tag.id} disabled />
                    <label>Tag value</label>
                    <input type="text" value={value} onChange={handleValue} />
                    <div className="grid">
                        {displayButtonEdit()}
                        {displayButtonDelete()}
                        {displayButtonReset()}
                    </div>
                </form>
            </div>        
        )
    }

    return displayTag()
}

export default Tag