import { useState, useEffect } from "react"
import { TAGS_DOWNLOAD_URL } from '../global'
import PropTypes from 'prop-types'
import axios from "axios"
import TagCorrect from "./TagCorrect"
import TagNormal from "./TagNormal"
import useIsMount from "../hooks/useIsMount"

TagSelector.propTypes  = {
    transferTags: PropTypes.func.isRequired,
    selectedTags: PropTypes.array,
    reset: PropTypes.bool
}
function TagSelector(props){
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const isMount = useIsMount();

    useEffect(()=>{
        if(props.selectedTags){
            setSelectedTags(props.selectedTags)
        }
    }, [props.selectedTags])

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
        console.log(selectedTags)
    }, [selectedTags])

    useEffect(()=>{
        if(props.reset !== undefined){
            setSelectedTags([])
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
        setSearchTerm('')
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
                {searchTerm !== "" && 
                    tags
                        .filter(array => !selectedTags.some(selectedTag => selectedTag.id === array.id))
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

export default TagSelector