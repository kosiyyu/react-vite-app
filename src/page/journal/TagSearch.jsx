import { useState, useEffect, useContext } from "react"

import axios from "axios"
import TagCorrect from "../../components/TagCorrect"
import TagNormal from "../../components/TagNormal"
import useIsMount from "../../hooks/useIsMount"
import { SearchTokenContext } from "../../context/SearchTokenProvider"
import { TAGS_DOWNLOAD_URL } from "../../global"

function TagSearch(){
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const isMount = useIsMount()

    const { state, dispatch, reset } = useContext(SearchTokenContext)

    useEffect(() => {
        if (isMount) {
            return
        }
        console.log("TAGSEARCH RESET")
        setSelectedTags([])
        setSearchTerm('')
    }, [reset])

    useEffect(()=>{
        axios.get(TAGS_DOWNLOAD_URL)
            .then(object => {
                setTags(object.data)
            })
            .catch(error => {
                console.error(`error ${error}`)
            })
        }, [])

    useEffect(() => {
        const values = selectedTags.map(v => v.value)
        const newSearchToken = {...state, tagStrings: values}
        dispatch({type: "UPDATE", value: {searchToken: newSearchToken}})
    }, [selectedTags])

    const search = (event) => {
        setSearchTerm(event.target.value)
    }

    const selectTag = (tag) => {
        if(selectedTags.includes(tag)) {
            setSelectedTags(array => array.filter(x => x !== tag))
        }    
        else {
            setSelectedTags([...selectedTags, tag])
        }
    }

    return (
        <div>
            <label>
                Search tag
                <input 
                    value={searchTerm} 
                    onChange={search} 
                    type="search" 
                    placeholder="e.g. super mario"
                    onKeyDown={(e)=>{
                        if(e.key === 'Enter'){
                            e.preventDefault();
                        }
                    }} 
                />
            </label>
            <div>
                {selectedTags.map((tag, index) => (
                    <TagCorrect tagId={tag.id} onClick={() => selectTag(tag)} key={index}>{tag.value}</TagCorrect>
                ))}
            </div>
            <div>
                {searchTerm !== '' && 
                    tags
                        .filter(array => !selectedTags.includes(array))
                        .filter(tag => tag.value?.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((tag, index) => (
                            <TagNormal tagId={tag.id} onClick={() => selectTag(tag)} key={index}>{tag.value}</TagNormal>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default TagSearch