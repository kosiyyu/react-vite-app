//import { useParams } from "react-router-dom"
//import { useState } from "react"
import Header from "../../components/Header"
import TagSelector from "../../components/TagSelector"
//import { useEffect } from "react"
import axios from "axios"

function AddArticle() {
    const initialArticle = {
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
      }

    const correctArticle = {
        "article": {
          "title1": "Test title",
          "issn1": "Test issn",
          "eissn1": "Test eissn",
          "title2": "Test title",
          "issn2": "Test issn",
          "eissn2": "Test eissn",
          "tags": [
            {"value": "Diagram"},
            {"value": "0"}
          ]
        },
        "originalFilename": "AAA.txt",
        "byteArray": "QUFB"
      }

    function postArticle(){
        const megredArticle = {...initialArticle, ...correctArticle}
        axios.post('http://localhost:8081/api/v1/article/bundle/upload/', megredArticle)
            .then((response) => {
            console.log('FRONT INFO:', response.data)
            })
            .catch((error) => {
            console.error('FRONT ERROR:', error)
            })
    }

    const sendArticle = () => {
        console.log("sending article...")      
        postArticle()
    }


    return (
        <>
            <Header>Add article</Header>
            <article>
                <label>
                    Title
                    <input placeholder="Title" required/>
                </label>
                <div className="grid">
                    <label>
                        Issn code
                        <input placeholder="Issn code" required/>
                    </label>
                    <label>
                        E-issn code
                        <input placeholder="E-issn code" required/>
                    </label>                 
                </div>
                <label>
                    Title 2
                    <input placeholder="Title 2"/>
                </label>
                <div className="grid">
                    <label>
                        Issn code 2
                        <input placeholder="Issn code 2"/>
                    </label>
                    <label>
                        E-issn code 2
                        <input placeholder="E-issn code 2"/>
                    </label>                 
                </div>
                <div>
                    <TagSelector />
                </div>
                <label>File browser
                        <input type="file"/>
                    </label>
                <button onClick={() => sendArticle()}>
                    Send
                </button>
            </article>
        </>
    )
}

export default AddArticle