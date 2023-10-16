import { useEffect, useState } from "react"
import TagCorrect from "../../components/TagCorrect";
import Tag from "../../components/Tag";
import useIsMount from "../../hooks/useIsMount";
import PropTypes from 'prop-types'

JournalSearch.propTypes = {
    transferSearchStrings: PropTypes.func.isRequired
}
function JournalSearch(props) {
    const [searchStrings, setSearchStrings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const isMountSearchStrings = useIsMount()

    useEffect(()=>{
        if(isMountSearchStrings)
            return
        props.transferSearchStrings(searchStrings)
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
                <input value={searchTerm} onChange={search} onKeyDown={(e)=>{if(e.key==='Enter'){e.preventDefault();}}} type="search" placeholder="e.g. hello world"/>
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