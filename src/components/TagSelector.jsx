import { useState, useEffect } from "react"
import { TAGS_DOWNLOAD_URL } from '../global'
import PropTypes from 'prop-types'
import axios from "axios"
import TagCorrect from "./TagCorrect"
import Tag from "./Tag"
import useIsMount from "../hooks/useIsMount"
//import TagNotFoundModal from "./TagNotFoundModal"

TagSelector.propTypes  = {
    tags: PropTypes.func.isRequired
}

function TagSelector(props){
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const isMount = useIsMount();

    useEffect(()=>{
        axios.get(TAGS_DOWNLOAD_URL)
            .then(object => {
                setTags(object.data)
                console.log(object.data)
            })
            .catch(error => {
                console.log(`error ${error}`)
            })
        }, [])

    useEffect(()=>{
        if(isMount)
            return
        props.tags(selectedTags)
        //console.log('TagSelector change')
        //console.log(selectedTags)
    }, [props])

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
        // todo define display strategy (it's more for backend imo)
        // todo correct placement or sorting
    }

    return (
        <>
            <label>
                Search tag
                <input value={searchTerm} onChange={search} type="search" />
            </label>
            {/* <TagNotFoundModal /> */}
            <div>
                {selectedTags.map((tag, index) => (
                    <TagCorrect tagId={tag.id} onClick={() => selectTag(tag)} key={index}>{tag.value}</TagCorrect>
                ))}
            </div>
            <div>
                {searchTerm !== '' && 
                    tags
                        .filter(array => !selectedTags.includes(array))
                        .filter(tag => tag.value.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((tag, index) => (
                            <Tag tagId={tag.id} onClick={() => selectTag(tag)} key={index}>{tag.value}</Tag>
                        )
                    )
                }
            </div>
        </>
    )
}

export default TagSelector