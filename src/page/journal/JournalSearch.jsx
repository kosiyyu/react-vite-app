import { useEffect, useState } from "react"
import TagCorrect from "../../components/TagCorrect";
import Tag from "../../components/Tag";
import useIsMount from "../../hooks/useIsMount";
import PropTypes from 'prop-types'

JournalSearch.propTypes = {
    transferPhrases: PropTypes.func.isRequired
}
function JournalSearch(props) {
    const [phrases, setPhrases] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const isMountPhrases = useIsMount()

    useEffect(()=>{
        if(isMountPhrases)
            return
        props.transferPhrases(phrases)
    }, [phrases])

    function selectPhrase(phrase) {
        
        if(phrases.includes(phrase)) {
            setPhrases(array => array.filter(x => x !== phrase))
        }    
        else {
            setPhrases([...phrases, phrase])
        }
        setSearchTerm('')
    }

    const search = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <>
            <label>
                Search phrase
                <input value={searchTerm} onChange={search} onKeyDown={(e)=>{if(e.key==='Enter'){e.preventDefault();}}} type="search" placeholder="e.g. hello world"/>
            </label>
            <div>
                {phrases.map((phrase, index) => (
                    <TagCorrect tagId={-1} onClick={() => selectPhrase(phrase)} key={index}>{phrase}</TagCorrect>
                ))}
            </div>
           {searchTerm === '' ? '' : <Tag tagId={-1} onClick={() => selectPhrase(searchTerm)}>{searchTerm}</Tag>}
        </>
    )
}

export default JournalSearch