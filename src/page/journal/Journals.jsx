import { useContext, useEffect, useState } from "react"
import JournalList from "../../components/JournalList"
import AddJournalModal from "../../components/AddJournalModal"
import useIsMount from "../../hooks/useIsMount";
import TagSearch from "./TagSearch"
import JournalSearch from "./JournalSearch";
import { SearchTokenContext, defaultSearchToken } from "../../context/SearchTokenProvider";

function Journals() {
    const {display, dispatchDisplay, state, dispatch, reset,setReset, setButtonSent } = useContext(SearchTokenContext)

    const [displayModal, setDisplayModal] = useState(false)
    const [displaySearch, setDisplaySearch] = useState(false)

    const [orderByArgument, setOrderByArgument] = useState("Id")
    const [isDescSort, setDescSort] = useState(false)

    const isMount = useIsMount()

    useEffect(() => {
        if(isMount)
            return
        console.log("JOURNALS RESET")
        setOrderByArgument("Id")
        setDescSort(false)
    }, [reset])

    function updateOnSubmit(e) {
        e.preventDefault()
        dispatch({type: "UPDATE", value: {searchToken: state}})
        dispatchDisplay({type: "UPDATE", value: {searchToken: state}})
        setButtonSent(s => !s)
    }

    function resetToggle(){
        dispatch({type: "RESET", value: {searchToken: defaultSearchToken}})
        dispatchDisplay({type: "RESET", value: {searchToken: defaultSearchToken}})
        setReset(r => !r)
        
    }


    return (
        <>
            <h1>📰 Journals</h1>
            <h6><a onClick={() => setDisplayModal(true)}>:: add journal ::</a></h6>
            {displayModal && <AddJournalModal closeModal={() => setDisplayModal(false)} />}
            <label>
                <input type="checkbox" role="switch" checked={displaySearch ? "active" : ""} onChange={() => setDisplaySearch(!displaySearch)}/>
                Search filter
            </label>
            {displaySearch ? 
            <div>
                <form onSubmit={(e) => updateOnSubmit(e)}>
                    <label>Sort by</label>
                    <select 
                        value={orderByArgument}
                        onChange={(e) => setOrderByArgument(e.target.value)}
                        name="orderBy" 
                        required
                    >
                        <option>Id</option>
                        <option>Title 1</option>
                        <option>issn1</option>
                        <option>E-issn 1</option>
                        <option>Title 2</option>
                        <option>Issn 2</option>
                        <option>E-issn 2</option>
                        <option>Points</option>
                    </select>
                    <JournalSearch></JournalSearch>
                    <TagSearch/>
                    <fieldset>
                        <label>
                            Descending order
                        </label>
                        <input checked={isDescSort} onChange={(e) => setDescSort(e.target.checked)} type="checkbox" name="isDesc" role="switch"/>
                    </fieldset>
                    <button type="submit">Search</button>
                    <a onClick={resetToggle}>Reset your search filters here...</a>
                </form>
            </div>
            :
            ""}
                <JournalList></JournalList>
        </>
    )
}

export default Journals
