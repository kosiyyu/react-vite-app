import { useState } from "react"
import ArticleList from "../../components/ArticleList"
import AddArticleModal from "../../components/AddArticleModal"

function Articles() {
    const [displayModal, setDisplayModal] = useState(false);
    return (
        <>
            <h1>📰 Articles</h1>
            <h6><a onClick={() => setDisplayModal(true)}>🆕 :: add article ::</a></h6>
            {displayModal && <AddArticleModal closeModal={() => setDisplayModal(false)} />}
            <ArticleList></ArticleList>
        </>
    )
}

export default Articles
