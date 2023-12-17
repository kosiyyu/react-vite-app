import { useState } from "react"
import axios from "axios"
import { CSV_UPLOAD_URL } from "../../global"
import toast, { Toaster } from "react-hot-toast"
import { multipartFormData } from "../../headers/headers"

const displayErrorToast = (msg) => toast.error(msg)
const displaySuccessToast = (msg) => toast.success(msg)

function Csv(){
    const [file, setFile] = useState(undefined)
    const [isLoading, setIsLoadind] = useState(false)

    function handleSubmit(){
        return (e) => {
        e.preventDefault()
        if(!file){
            displayErrorToast("No file selected. Please choose a CSV file to upload.")
            return
        }
            setIsLoadind(true)
            const formData = new FormData()
            formData.append("csv", file)
            axios.post(CSV_UPLOAD_URL, formData, multipartFormData)
            .then(response => {
                setFile(undefined)
                e.target.reset()
                setIsLoadind(false)
                displaySuccessToast(response.data)
            })
            .catch(error => {
                setIsLoadind(false)
                displayErrorToast(error.response.data)
            })
        }
    }

    function handleOnChnage() {
        return (e) => {
            e.preventDefault()
            setFile(e.target.files[0])
        }
    }

    function displayButton(){
        if(isLoading)
            return <button aria-busy="true" aria-label="Please wait…" />
        return <button type="submit">Send</button>
    }

    return (
        <div className="container">
            <hgroup>
                <h1>Csv</h1>
                <h2>Welcome! Upload your Ministerial List of Scientific Journals in <code>.csv</code> format, to save it into the database.</h2>
            </hgroup>
            <hr />
            <h3>Add csv file</h3>
            <form onSubmit={handleSubmit()}>
                <label>Attach csv file</label>
                <input 
                    name="file" 
                    type="file"
                    onChange={handleOnChnage()}
                    accept=".csv"
                />
                {displayButton()}
            </form>
            <Toaster />
        </div>
    )
}

export default Csv