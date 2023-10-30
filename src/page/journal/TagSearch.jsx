import { useState, useEffect, useContext } from "react"

import axios from "axios"
import TagCorrect from "../../components/TagCorrect"
import Tag from "../../components/Tag"
import useIsMount from "../../hooks/useIsMount"
import { SearchTokenContext } from "../../context/SearchTokenProvider"
import { TAGS_DOWNLOAD_URL } from "../../global"

function TagSearch(){
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const isMount = useIsMount()

    const { state, dispatch, reset } = useContext(SearchTokenContext)
    const [isReset, setIsReset] = useState(false)

    useEffect(() => {
        setSelectedTags([])
        setSearchTerm('')
        console.log("TagSearch: USE_EFFECT RESET")
        setIsReset(true)
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
        if (isMount || isReset) {
            setIsReset(false)
            return
        }
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
                <input value={searchTerm} onChange={search} type="search" placeholder="e.g. super mario" />
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
                            <Tag tagId={tag.id} onClick={() => selectTag(tag)} key={index}>{tag.value}</Tag>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default TagSearch