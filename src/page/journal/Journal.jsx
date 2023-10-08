import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { ARTICLE_DOWNLOAD_URL } from "../../global"
import Header from "../../components/Header";
import axios from "axios";

function Journal() {
    const journalId = useParams().id;

    // dummy fetch later, bundle object with file + article will be needed, but it needs to be implemented in backend

    useEffect(()=>{
        axios.get(ARTICLE_DOWNLOAD_URL(journalId))
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(`error: ${error}`)
            })
    }, [journalId])

    return (
        <>
            <Header>Journal {journalId}</Header>
            <section id="preview">
                
            </section>
        </>
    )
}

export default Journal