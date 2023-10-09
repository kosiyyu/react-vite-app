import { useState } from "react"
import JournalList from "../../components/JournalList"
import AddJournalModal from "../../components/AddJournalModal"

function Journals() {
    const [displayModal, setDisplayModal] = useState(false);
    return (
        <>
            <h1>📰 Journals</h1>
            <h6><a onClick={() => setDisplayModal(true)}>🆕 :: add journal ::</a></h6>
            {displayModal && <AddJournalModal closeModal={() => setDisplayModal(false)} />}
            <JournalList></JournalList>
        </>
    )
}

export default Journals
