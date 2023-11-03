import { useState, useEffect } from "react"
import axios from "axios"
import { CSV_UPLOAD_URL } from "../../global"

function Csv(){
    const [file, setFile] = useState(undefined)

    useEffect(()=>{
        console.log(file)
    }, [file])

    function handleSubmit(e){
        if(!file){
            console.log("ERROR")
            return
        }
        e.preventDefault()
        const formData = new FormData()
        formData.append("csv", file)
        axios.post(CSV_UPLOAD_URL, formData, {
            "headers": {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => {
            console.log(response.data)
            setFile(undefined)
            e.target.reset()
        })
        .catch(error => {
            console.log(error)
        })
    }

    function handleOnChnage() {
        return (e) => {
            e.preventDefault()
            setFile(e.target.files[0])
        }
    }

    return (
        <div className="container">
            <hgroup>
                <h1>Csv</h1>
                <h2>Welcome! Upload your Ministerial List of Scientific Journals in <code>.csv</code> format, to save it into the database.</h2>
            </hgroup>
            <hr></hr>
            <article>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <fieldset>
                        <label>Csv file</label>
                        <input 
                            name="file" 
                            type="file"
                            onChange={handleOnChnage()}
                            accept=".csv" 
                        />
                    </fieldset>
                    <button type="submit">Send</button>
                </form>
            </article>
        </div>
    )
}

export default Csv