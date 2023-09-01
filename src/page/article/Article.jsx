import { useParams } from "react-router-dom"

function Article() {
    const articleId = useParams().id;
    return (
        <>
            <h1>Article {"Article info" + articleId}</h1>
        </>
    )
}

export default Article