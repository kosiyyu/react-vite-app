import { useContext, useEffect, useState } from "react"
import TagCorrect from "../../components/tags/TagCorrect";
import TagNormal from "../../components/tags/TagNormal";
import useIsMount from "../../hooks/useIsMount";
import { SearchTokenContext } from "../../context/SearchTokenProvider";

function JournalSearch() {
    const [searchStrings, setSearchStrings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

    const { state, dispatch, reset } = useContext(SearchTokenContext)
    const isMountReset = useIsMount()
    const isMountSearchStrings = useIsMount()

    useEffect(() => {
        if (isMountReset) {
            return
        }
        console.log("JOURNALSEARCH RESET")
        setSearchStrings([])
    }, [reset])

    useEffect(()=>{
        if(isMountSearchStrings)
            return
        const updatedSearchToken = {...state, "searchStrings": searchStrings}
        dispatch({type: "UPDATE", value: {searchToken: updatedSearchToken}})
    }, [searchStrings])

    function selectSearchStrings(searchString) {
        if(searchStrings.includes(searchString)) {
            setSearchStrings(array => array.filter(x => x !== searchString))
        }    
        else {
            setSearchStrings([...searchStrings, searchString])
        }
        setSearchTerm('')
    }

    const search = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <>
            <label>
                Search term
                <input 
                    value={searchTerm} 
                    onChange={search} 
                    onKeyDown={(e)=>{
                        if(e.key === 'Enter'){
                            e.preventDefault();
                        }
                    }} 
                    type="search" 
                    placeholder="e.g. hello world"
                />
            </label>
            <div>
                {searchStrings.map((searchString, index) => (
                    <TagCorrect tagId={-1} onClick={() => selectSearchStrings(searchString)} key={index}>{searchString}</TagCorrect>
                ))}
            </div>
           {searchTerm === '' ? '' : <TagNormal tagId={-1} onClick={() => selectSearchStrings(searchTerm)}>{searchTerm}</TagNormal>}
        </>
    )
}

export default JournalSearch