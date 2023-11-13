import { useState } from "react"
import { JOURNAL_BUNDLE_UPLOAD_URL } from "../../global"
import axios from "axios"
import TagSelector from "../../components/TagSelector"
import { multipartFormData } from "../../headers/headers"
import ButtonCorrect from "../../components/buttons/ButtonCorrect";
import { defaultJournal } from "../../context/defaultObjects"
import toast from "react-hot-toast"

const displayErrorToast = (msg) => toast.error(msg)
const displaySuccessToast = (msg) => toast.success(msg)

function AddJournal() {
    const [file, setFile] = useState(null)
    const [tags, setTags] = useState([])
    const [isTagSelector, setIsTagSelector] = useState(false)

    function updateData(e) {
        e.preventDefault()
        const newJournal = {...defaultJournal,
            title1: e.target.elements.title.value,
            issn1: e.target.elements.issn.value,
            eissn1: e.target.elements.eissn.value,
            title2: e.target.elements.title2.value,
            issn2: e.target.elements.issn2.value,
            eissn2: e.target.elements.eissn2.value,
            points: e.target.elements.points.value,
            tags: tags
        }
        const formData = new FormData()
        formData.append("file", file)
        formData.append("journalJson", JSON.stringify(newJournal))
        axios.post(JOURNAL_BUNDLE_UPLOAD_URL, formData, multipartFormData)
            .then((response) => {
                console.log(`SUCCESS: ${response.data}`)               
                setFile(null)
                setIsTagSelector(x => !x)
                e.target.reset()
                displaySuccessToast(response.data)
            })
            .catch((error) => {
                console.error(`ERROR: ${error}`)
                displayErrorToast(error.response.data)
            })
    }

    function transferTags(value) {
        setTags(value)
    }

    return (
        <article>
            <form onSubmit={(e) => updateData(e)}>
                <label>Title<input name="title" placeholder="Title" required /></label>
                <div className="grid">
                    <label>Issn code<input name="issn" placeholder="Issn code" /></label>
                    <label>E-issn code<input name="eissn" placeholder="E-issn code" /></label>
                </div>
                <label>Title 2<input name="title2" placeholder="Title 2" /></label>
                <div className="grid">
                    <label>Issn code 2<input name="issn2" placeholder="Issn code 2" /></label>
                    <label>E-issn code 2<input name="eissn2" placeholder="E-issn code 2" /></label>
                </div>
                <label>Points<input name="points" placeholder="Points" /></label>
                <div>
                    <TagSelector reset={isTagSelector} transferTags={(value) => transferTags(value)} />
                </div>
                <label>File browser<input type="file" onChange={(e) => setFile(e.target.files[0])} /></label>
                <ButtonCorrect type="submit">Send</ButtonCorrect>
            </form>
        </article>
    )
}

export default AddJournal
