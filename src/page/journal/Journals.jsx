import { useContext, useEffect, useState } from "react"
import JournalList from "./JournalList"
import AddJournalModal from "../../components/AddJournalModal"
import useIsMount from "../../hooks/useIsMount";
import TagSearch from "./TagSearch"
import JournalSearch from "./JournalSearch";
import { SearchTokenContext, defaultSearchToken } from "../../context/SearchTokenProvider";

function Journals() {
    const {dispatchDisplay, state, dispatch, reset,setReset, setButtonSent } = useContext(SearchTokenContext)

    const [isAddJournalModal, setIsAddJournalModal] = useState(false)
    const [isSearch, setIsSearch] = useState(false)

    // FOR RESET
    const [orderByArgument, setOrderByArgument] = useState("Id")
    const [isDescSort, setDescSort] = useState(false)
    const isMountReset = useIsMount()

    useEffect(() => {
        if(isMountReset)
            return
        console.log("JOURNALS RESET")
        setOrderByArgument("Id")
        setDescSort(false)
    }, [reset])

    // HANDLE FUNCTIONS

    function handleSubmit(e) {
        e.preventDefault()
        const newSearchToken = {...state, orderByArgument: orderByArgument, isDescSort: isDescSort}
        dispatch({type: "UPDATE", value: {searchToken: newSearchToken}})
        dispatchDisplay({type: "UPDATE", value: {searchToken: newSearchToken}})
        setButtonSent(s => !s)
    }

    function handleReset(){
        dispatch({type: "RESET", value: {searchToken: defaultSearchToken}})
        dispatchDisplay({type: "RESET", value: {searchToken: defaultSearchToken}})
        setReset(r => !r)
        
    }

    // DISPLAY FUNCTIONS

    function displayAddJournalModal(){
        if(isAddJournalModal)
            return <AddJournalModal closeModal={() => setIsAddJournalModal(false)} />
        return ""
    }

    function displaySearchSwitch(){
        return(
        <label>
            <input 
                type="checkbox" 
                role="switch" 
                checked={isSearch ? "active" : ""} 
                onChange={() => setIsSearch(!isSearch)}
            />
            Search filter
        </label>
        )
    }

    function displaySearch(){
        if(isSearch)
            return(
                <form onSubmit={(e) => handleSubmit(e)}>
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
                    <input 
                        checked={isDescSort} 
                        onChange={(e) => setDescSort(e.target.checked)} 
                        type="checkbox" 
                        name="isDesc" 
                        role="switch"
                    />
                </fieldset>
                <button type="submit">Search</button>
                <a onClick={handleReset}>Reset your search filters here...</a>
            </form>
        )
        return ""
    }

    //

    return (
        <>
            <h1>📰 Journals</h1>
            <h6><a onClick={() => setIsAddJournalModal(true)}>:: add journal ::</a></h6>
            {displayAddJournalModal()}
            {displaySearchSwitch()}
            {displaySearch()}
            <JournalList></JournalList>
        </>
    )
}

export default Journals
