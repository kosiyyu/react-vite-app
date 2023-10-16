import { useEffect, useState } from "react"
import JournalList from "../../components/JournalList"
import AddJournalModal from "../../components/AddJournalModal"
import useIsMount from "../../hooks/useIsMount";
import TagSelector from "../../components/TagSelector";

function Journals() {
    const [displayModal, setDisplayModal] = useState(false);
    const [displaySearch, setDisplaySearch] = useState(false);
    const [searchToken, setsearchToken] = useState(
        {
            "whereArguments": [],
            "orderByArgument": "",
            "pageIndex": 0,
            "pageSize": 3,
            "isDescSort": false
        }
    );
    const [whereArguments, setWhereArguments] = useState([]);
    const isMountSearchToken = useIsMount();

    useEffect(()=>{
        if(isMountSearchToken){
            return
        }
        console.log(searchToken)
    },[searchToken])

    function updateOnSubmit(e) {
        e.preventDefault()
        setsearchToken((x) => ({
            ...x,
            ...{
            "whereArguments": whereArguments,
            "orderByArgument": e.target.elements.orderBy.value,
            "pageIndex": 0,
            "pageSize": 3,
            "isDescSort": e.target.elements.isDesc.checked
            }
        })
        )
    }

    function transferTags(value){
        setWhereArguments([...whereArguments, value])
    }




    return (
        <>
            <h1>📰 Journals</h1>
            <h6><a onClick={() => setDisplayModal(true)}>🆕 :: add journal ::</a></h6>
            {displayModal && <AddJournalModal closeModal={() => setDisplayModal(false)} />}
            <label>
                <input type="checkbox" role="switch" checked={displaySearch ? "active" : ""} onChange={() => setDisplaySearch(!displaySearch)}/>
                Search
            </label>
            {displaySearch ? 
            <div>
                <form onSubmit={(e) => updateOnSubmit(e)}>
                    <label>Sort by</label>
                    <select name="orderBy" required>
                        <option>id</option>
                        <option>title1</option>
                        <option>issn1</option>
                        <option>e-issn1</option>
                        <option>title2</option>
                        <option>issn2</option>
                        <option>e-issn2</option>
                    </select>
                    <label>
                        Search phrase
                        <input type="search" placeholder="e.g. hello world"/>
                    </label>
                    <TagSelector transferTags={(value) => transferTags(value)}/>
                    <fieldset>
                        <label>
                            Descending order
                        </label>
                        <input type="checkbox" name="isDesc" role="switch"/>
                    </fieldset>
                    <button type="submit">Search</button>
                </form>
            </div>
            :
            ""}
            <JournalList></JournalList>
        </>
    )
}

export default Journals
