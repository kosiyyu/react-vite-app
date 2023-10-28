import { useState, useEffect } from "react"
import { TAGS_DOWNLOAD_URL } from '../global'
import PropTypes from 'prop-types'
import axios from "axios"
import TagCorrect from "./TagCorrect"
import Tag from "./Tag"
import useIsMount from "../hooks/useIsMount"

TagSelector.propTypes  = {
    transferTags: PropTypes.func.isRequired,
    reset: PropTypes.bool
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
            })
            .catch(error => {
                console.error(`error ${error}`)
            })
        }, [])

    useEffect(()=>{
        if(isMount)
            return
        props.transferTags(selectedTags)
    }, [selectedTags])

    useEffect(()=>{
        if(props.reset !== undefined){
            setSelectedTags([])
            setSearchTerm('')
        }
    }, [props.reset])


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

export default TagSelector