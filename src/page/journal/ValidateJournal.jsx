import { useParams } from "react-router-dom"
import NotFound from "../error/NotFound"
import Journal from "./Journal"

function ValidateJournal() {
    const params = useParams()
    const journalId = params.id
    if (!isNaN(journalId) && journalId > 0) {
      return <Journal />
    }
    return <NotFound />
  }

export default ValidateJournal