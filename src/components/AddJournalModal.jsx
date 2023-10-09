import { useState } from "react"
import { useEffect } from "react"
import { JOURNAL_BUNDLE_POST_URL } from "../global"
import useIsMount from "../hooks/useIsMount"
import axios from "axios"
import Header from "./Header"
import TagSelector from "./TagSelector"
import PropTypes from "prop-types"

AddJournalModal.propTypes = {
    closeModal: PropTypes.func.isRequired
}

function AddJournalModal(props) {
  const isMoutFile = useIsMount()
  const isMountJournal = useIsMount()
  const isMountTags = useIsMount()
  const [file, setFile] = useState(null)
  const [journal, setJournal] = useState(
    {
      //"id": null,
      "title1": null,
      "issn1": null,
      "eissn1": null,
      "title2": null,
      "issn2": null,
      "eissn2": null,
      "points": null,
      "tags": []
    }
  )
  const [tags, setTags] = useState([])

  useEffect(() => {
    if(isMoutFile)
      return
  }, [file])

  useEffect(() => {
    if (isMountJournal)
      return
    const formData = new FormData()
    formData.append('file', file)
    formData.append('journalJson', JSON.stringify(journal))
    axios.post(JOURNAL_BUNDLE_POST_URL, formData, {
      "headers": {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      console.log(`SUCCESS: ${response.data}`)
    })
    .catch((error) => {
      console.error(`ERROR: ${error}`)
    })
  }, [journal])

  useEffect(()=>{
    if(isMountTags)
      return
  }, [tags])

  function updateData(e){
    e.preventDefault() 
    setJournal((x) => ({
      ...x,
      ...{
          "title1": e.target.elements.title.value,
          "issn1": e.target.elements.issn.value,
          "eissn1": e.target.elements.eissn.value,
          "title2": e.target.elements.title2.value,
          "issn2": e.target.elements.issn2.value,
          "eissn2": e.target.elements.eissn2.value,
          "points": e.target.elements.points.value,
          "tags": tags
        }
      }
    ))
  }

  function transferTags(value){
    setTags(value)
  }

  return (
    <dialog open>
        <article>
            <Header>Add journal</Header>
            <form onSubmit={(e) => updateData(e)}>
                <label>Title<input name="title" placeholder="Title" required/></label>
                <div className="grid">
                    <label>Issn code<input name="issn" placeholder="Issn code"/></label>
                    <label>E-issn code<input name="eissn" placeholder="E-issn code" /></label>                 
                </div>
                <label>Title 2<input name="title2" placeholder="Title 2"/></label>
                <div className="grid">                    
                    <label>Issn code 2<input name="issn2" placeholder="Issn code 2"/></label>
                    <label>E-issn code 2<input name="eissn2" placeholder="E-issn code 2"/></label>                 
                </div>
                <label>Points<input name="points" placeholder="Points"/></label>
                <div>
                    <TagSelector transferTags={(value) => transferTags(value)}/>
                </div>  
                <label>File browser<input type="file" onChange={(e) => setFile(e.target.files[0])}/></label>        
                <button type="submit">Send</button>                
            </form>
            <button onClick={() => props.closeModal()}>Close</button>    
        </article>
    </dialog>
  )
}

export default AddJournalModal