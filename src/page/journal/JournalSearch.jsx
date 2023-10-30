import { useContext, useEffect, useState } from "react"
import TagCorrect from "../../components/TagCorrect";
import Tag from "../../components/Tag";
import useIsMount from "../../hooks/useIsMount";
import { SearchTokenContext } from "../../context/SearchTokenProvider";

function JournalSearch() {
    const [searchStrings, setSearchStrings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

    const { state, dispatch, reset } = useContext(SearchTokenContext)
    const [isReset, setIsReset] = useState(false)
    const isMount = useIsMount()

    useEffect(() => {
        console.log("JournalSearch: USE_EFFECT RESET")
        setSearchStrings([])
        setIsReset(true)
    }, [reset])

    useEffect(()=>{
        if (isMount || isReset) {
            setIsReset(false)
            return
        }
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
           {searchTerm === '' ? '' : <Tag tagId={-1} onClick={() => selectSearchStrings(searchTerm)}>{searchTerm}</Tag>}
        </>
    )
}

export default JournalSearch