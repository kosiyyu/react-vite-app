import { useState } from "react"
import axios from "axios"
import { CSV_UPLOAD_URL } from "../../global"
import toast, { Toaster } from "react-hot-toast"

const displayErrorToast = (msg) => toast.error(msg)
const displaySuccessToast = () => toast.success("File sent successfully.")

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
            axios.post(CSV_UPLOAD_URL, formData, {
                "headers": {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(() => {
                setFile(undefined)
                e.target.reset()
                setIsLoadind(false)
                displaySuccessToast()
            })
            .catch(() => {
                setIsLoadind(false)
                displayErrorToast("Invalid file sent. Please ensure the file is a csv in requred pattern.")
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
            <hr></hr>
            <article>
                <form onSubmit={handleSubmit()}>
                    <fieldset>
                        <label>Csv file</label>
                        <input 
                            name="file" 
                            type="file"
                            onChange={handleOnChnage()}
                            accept=".csv"
                        />
                    </fieldset>
                    {displayButton()}
                </form>
            </article>
            <Toaster />
        </div>
    )
}

export default Csv