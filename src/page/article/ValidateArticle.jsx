import { useParams } from "react-router-dom"
import NotFound from "../error/NotFound"
import Article from "./Article"

function ValidateArticle() {
    const params = useParams()
    const articleId = params.id
    if (!isNaN(articleId) && articleId > 0) {
      return <Article />
    }
    return <NotFound />
  }

export default ValidateArticle