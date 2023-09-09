import { useState } from "react"
import Header from "../../components/Header"
import TagSelector from "../../components/TagSelector"
import { useEffect } from "react"
import axios from "axios"
import useIsMount from "../../hooks/useIsMount"

function AddArticle() {
  const isMount = useIsMount();
  const [article, setArticle] = useState({
    "article": {
      "id": null,
      "title1": null,
      "issn1": null,
      "eissn1": null,
      "title2": null,
      "issn2": null,
      "eissn2": null,
      "tags": []
    },
    "originalFilename": null,
    "byteArray": null
  })

  useEffect(() => {
    if (isMount)
      return
    console.log(article)
    axios.post('http://localhost:8081/api/v1/article/bundle/upload/', article)
    .then((response) => {
      console.log(`SUCCESS: ${response.data}`)
    })
    .catch((error) => {
      console.error(`ERROR: ${error}`)
    })
  }, [article, isMount])

  function updateArticle(e){
    e.preventDefault() 
    setArticle((x) => ({
      ...x,
      ...{
        "article": {
            "title1": e.target.elements.title.value,
            "issn1": e.target.elements.issn.value,
            "eissn1": e.target.elements.eissn.value,
            "title2": e.target.elements.title2.value,
            "issn2": e.target.elements.issn2.value,
            "eissn2": e.target.elements.eissn2.value,
            "tags": [
              {"value": "Diagram"},
              {"value": "0"}
            ]
          },
          "originalFilename": "AAA.txt",
          "byteArray": "QUFB"
      }
    }))
  }


  return (
    <>
      <Header>Add article</Header>
      <form onSubmit={(e) => updateArticle(e)}>
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
        <div>
            <TagSelector />
        </div>
        <label>File browser<input type="file"/></label>
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default AddArticle