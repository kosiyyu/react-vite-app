import { useEffect, useState } from "react"
import JournalList from "../../components/JournalList"
import AddJournalModal from "../../components/AddJournalModal"
import useIsMount from "../../hooks/useIsMount";
import TagSelector from "../../components/TagSelector";
import JournalSearch from "./JournalSearch";

function Journals() {
    const [displayModal, setDisplayModal] = useState(false);
    const [displaySearch, setDisplaySearch] = useState(false);
    const [searchToken, setsearchToken] = useState(
        {
            "searchStrings": [],
            "tagStrings": [],
            "orderByArgument": "",
            "pageIndex": 0,
            "pageSize": 5,
            "isDescSort": false
        }
    );
    const [searchStrings, setSearchStrings] = useState([]);
    const [tagStrings, setTagStrings] = useState([]);
    const isMountSearchToken = useIsMount();
    const [reset, setReset] = useState(false);
    const [orderByArgument, setOrderByArgument] = useState("Id");
    const [isDescSort, setDescSort] = useState(false);

    useEffect(()=>{
        if(isMountSearchToken){
            return
        }
        /////////////////////////
        // I send it using JournalList and prop rerender
        /////////////////////////
        // setSearchStrings([])
        // setTagStrings([])
        console.log(searchToken)
    },[searchToken])

    function updateOnSubmit(e) {
        e.preventDefault()
        setReset(false)
        setsearchToken((x) => ({
            ...x,
            ...{
            "searchStrings": searchStrings,
            "tagStrings": tagStrings,
            "orderByArgument": e.target.elements.orderBy.value,
            "pageIndex": 0,
            "pageSize": 5,
            "isDescSort": e.target.elements.isDesc.checked
            }
        })
        )
    }

    function resetToggle(){
        setReset(x => !x)
    }

    useEffect(()=>{
        if(reset){
            setSearchStrings([])
            setTagStrings([])
            setOrderByArgument("Id")
            setDescSort(false)
        }
    }, [reset])

    function transferTags(value){
        setTagStrings(value.map(v => v.value))
    }

    function transferSearchStrings(value){
        setSearchStrings(value)
    }

    return (
        <>
            <h1>📰 Journals</h1>
            <h6><a onClick={() => setDisplayModal(true)}>:: add journal ::</a></h6>
            {displayModal && <AddJournalModal closeModal={() => setDisplayModal(false)} />}
            <label>
                <input type="checkbox" role="switch" checked={displaySearch ? "active" : ""} onChange={() => setDisplaySearch(!displaySearch)}/>
                Search
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
                    <JournalSearch reset={reset} transferSearchStrings={(value) => transferSearchStrings(value)}></JournalSearch>
                    <TagSelector reset={reset} transferTags={(value) => transferTags(value)}/>
                    <fieldset>
                        <label>
                            Descending order
                        </label>
                        <input checked={isDescSort} onChange={(e) => setDescSort(e.target.checked)} type="checkbox" name="isDesc" role="switch"/>
                    </fieldset>
                    <button type="submit">Search</button>
                    <a onClick={resetToggle}>Fresh start? Reset your search filters here.</a>
                </form>
            </div>
            :
            ""}
            <JournalList searchToken={searchToken}></JournalList>
        </>
    )
}

export default Journals
