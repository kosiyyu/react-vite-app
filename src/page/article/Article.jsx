import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { ARTICLE_DOWNLOAD_URL } from "../../global"
import Header from "../../components/Header";
import axios from "axios";

function Article() {
    const articleId = useParams().id;

    // dummy fetch later, bundle object with file + article will be needed, but it needs to be implemented in backend

    useEffect(()=>{
        axios.get(ARTICLE_DOWNLOAD_URL(articleId))
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(`error: ${error}`)
            })
    }, [articleId])

    return (
        <>
            <Header>Article {articleId}</Header>
            <section id="preview">
                
            </section>
        </>
    )
}

export default Article