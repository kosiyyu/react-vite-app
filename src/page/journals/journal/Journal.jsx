import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types"
import ButtonEdit from "../../../components/buttons/ButtonEdit";
import ButtonDelete from "../../../components/buttons/ButtonDelete";
import TagSelector from "../../../components/TagSelector";
import { applicationJson, multipartFormData } from "../../../headers/headers";
import axios from "axios";
import toast from "react-hot-toast"
import { JOURNAL_DELETE_URL, JOURNAL_EDIT_URL } from "../../../global";
import { Link, useNavigate } from "react-router-dom";
import TagDisplay from "../../../components/tags/TagDisplay";

import AddDataComponent from './AddDataComponent'

const displayErrorToast = (msg) => toast.error(msg)
const displaySuccessToast = (msg) => toast.success(msg)

Journal.propTypes = {
    journalData: PropTypes.object.isRequired
}
function Journal(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [tags, setTags] = useState(props.journalData.tags)
    const [file, setFile] = useState(null)
    const [journalOldState, setJournalOldState] = useState(props.journalData)
    const [journalNewState, setJournalNewState] = useState(props.journalData)
    const navigate = useNavigate()
    const [, setIsTagSelector] = useState(false)
    const fileInputRef = useRef(null)
    const [isAddData, setIsAddData] = useState(false)

    useEffect(()=>{
        console.log(journalNewState)
    },[journalNewState])

    const handleDelete = (e) => {
        e.preventDefault()
        console.log("DELETE")
        axios.delete(JOURNAL_DELETE_URL(journalOldState.id), applicationJson)
        .then(response => {
            navigate("/journals")
            displaySuccessToast(response.data)
        })
        .catch(error => {
            console.error(`ERROR: ${error}`)
            displayErrorToast(error.response.data)
        })
    }

    const handleReset = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setJournalNewState(journalOldState)
        setTags(journalOldState.tags)
        setFile(null)
        fileInputRef.current.value = null
        setIsTagSelector(x => !x)
        setIsLoading(false)
        displaySuccessToast("Reset changes.")
        console.log(journalOldState)
    }

    useEffect(()=>{
        console.log(tags)
    },[tags])

    const handleEdit = (e) => {
        e.preventDefault()    
        if (!journalNewState.title1 && !journalNewState.title2) {
            alert("At least one title must be filled in.")
            return
        }
        setIsLoading(true)
        console.log("EDIT")
        const formData = new FormData()
        formData.append("file", file)
        formData.append("journalJson", JSON.stringify(journalNewState))
        axios.put(JOURNAL_EDIT_URL, formData, multipartFormData)
        .then((response) => {
            console.log(`SUCCESS: ${response.data}`)
            setJournalOldState(response.data)
            setJournalNewState(response.data)
            fileInputRef.current.value = null
            displaySuccessToast("Journal edited successfully.")
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            console.error(`ERROR: ${error}`)
            displayErrorToast(error.response.data)
            setIsLoading(false)
        })
        setIsLoading(false)
    }

    function transferTags(array) {
        setTags(array)
        setJournalNewState({...journalNewState, tags: array})
        console.log(array)
    }

    const handleTitle1 = (e) => {
        setJournalNewState({ ...journalNewState, title1: e.target.value})
    }

    const handleIssn1 = (e) => {
        setJournalNewState({ ...journalNewState, issn1: e.target.value})
    }

    const handleEissn1 = (e) => {
        setJournalNewState({ ...journalNewState, eissn1: e.target.value})
    }

    const handlePoints = (e) => {
        setJournalNewState({ ...journalNewState, points: e.target.value})
    }

    const handleTitle2 = (e) => {
        setJournalNewState({ ...journalNewState, title2: e.target.value})
    }

    const handleIssn2 = (e) => {
        setJournalNewState({ ...journalNewState, issn2: e.target.value})
    }

    const handleEissn2 = (e) => {
        setJournalNewState({ ...journalNewState, eissn2: e.target.value})
    }

    const handleCiteScore = (e) => {
        setJournalNewState({ ...journalNewState, citeScore: e.target.value})
    }

    const handleAimsAndScope = (e) => {
        setJournalNewState({ ...journalNewState, aimsAndScope: e.target.value})
    }

    const handleImpactFactor = (e) => {
        setJournalNewState({ ...journalNewState, impactFactor: e.target.value})
    }

    function displayAddAddDataSwitch(){
        return(
            <label>
                <input 
                    type="checkbox" 
                    role="switch" 
                    checked={isAddData ? "active" : ""} 
                    onChange={() => setIsAddData(!isAddData)}
                />
                Fetch CiteScore, Aims and Scope
            </label>
        )
    }
        

    function displayJournal(){
        return (
            <form onSubmit={handleEdit} onReset={handleReset}>
                <label>Title</label>
                <input value={journalNewState.title1} onChange={handleTitle1} placeholder="Title"  />
                <div className="grid">
                    <label>Issn code
                        <input name="issn" value={journalNewState.issn1} onChange={handleIssn1} placeholder="Issn code" />
                    </label>
                    <label>E-issn code
                        <input name="eissn" value={journalNewState.eissn1} onChange={handleEissn1} placeholder="E-issn code" />
                    </label>
                </div>
                <label>Title 2</label>
                <input value={journalNewState.title2} onChange={handleTitle2} placeholder="Title"  />
                <div className="grid">
                    <label>Issn code 2
                        <input name="issn2" value={journalNewState.issn2}  onChange={handleIssn2} placeholder="Issn code 2" />
                    </label>
                    <label>E-issn code 2
                        <input name="eissn2" value={journalNewState.eissn2} onChange={handleEissn2} placeholder="E-issn code 2" />
                    </label>
                </div>
                <label>Impact Factor
                    <input name="points" value={journalNewState.impactFactor} onChange={handleImpactFactor} placeholder="Points" />
                </label>
                <div className="grid">
                    <label>Points
                        <input name="points" value={journalNewState.points} onChange={handlePoints} placeholder="Points" />
                    </label>
                    <label>CiteScore
                        <input name="citeScore" value={journalNewState.citeScore} onChange={handleCiteScore} placeholder="Cite score" />
                    </label>
                </div>
                <label>Aims and scope
                    <textarea name="aimsAndScope" rows="5" value={journalNewState.aimsAndScope || ""} onChange={handleAimsAndScope} placeholder="Aims and Scope" />
                </label>
                <div>
                    <TagSelector selectedTags={tags} transferTags={(value) => transferTags(value)} />
                </div>
                <label>File
                    <input name="file" type="file" title="When you attach new file, it will replace old one." ref={fileInputRef} onChange={(e) => setFile(e.target.files[0])} />
                </label>
                <label>File in system <Link to={`/file/${journalOldState && journalOldState.metadata && journalOldState.metadata.originalFilename ? journalOldState.metadata.id : -1}`}>{journalOldState && journalOldState.metadata && journalOldState.metadata.id ? journalOldState.metadata.originalFilename : ""}</Link></label>
                <br />
                <div className="grid">
                    {displayButtonEdit()}
                    {displayButtonDelete()}
                    {displayButtonReset()}
                </div>
            </form>
        )
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

    return (
        <div className="container">
            <hgroup>
                <h1>Journal</h1>
                <h2>Welcome! You can view and edit <TagDisplay>Journal</TagDisplay> in here.</h2>
            </hgroup>
            <h3>Fetch CiteScore, Aims and Scope</h3>
            {displayAddAddDataSwitch()}
            <AddDataComponent 
                setJournalNewState={setJournalNewState}
                journalNewState={journalNewState} 
                isAddData={isAddData} 
                setIsAddData={setIsAddData} 
            />
            <br />
            <h3>Journal content</h3>
            {displayJournal()}
        </div>
      )
}

export default Journal