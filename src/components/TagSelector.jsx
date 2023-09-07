import { useEffect, useState } from "react"
import Tag from "./Tag"
import axios from "axios"
//import TagNotFoundModal from "./TagNotFoundModal"
import TagCorrect from "./TagCorrect"

function TagSelector(){
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(()=>{
        axios.get('http://localhost:8081/api/v1/tags/download')
            .then(object => {
                setTags(object.data)
                console.log(object.data)
            })
            .catch(error => {
                console.log(`error ${error}`)
            })
    }, [])

    const search = (event) => {
        setSearchTerm(event.target.value)
    }

    const selectTag = (tag) => {
        if(selectedTags.includes(tag)) {
            setSelectedTags(xArray => xArray.filter(x => x !== tag))
            setTags([...tags, tag])
        }    
        else {
            setSelectedTags([...selectedTags, tag])
            setTags(xArray => xArray.filter(x => x !== tag))
        }
        // tododefine display strategy (it's more for backend imo)
        // todo correct placement or sorting
    }

    return (
        <form>
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
                {searchTerm !== '' && tags.filter(tag => tag.value.toLowerCase().includes(searchTerm.toLowerCase())).map((tag, index) => (
                    <Tag tagId={tag.id} onClick={() => selectTag(tag)} key={index}>{tag.value}</Tag>
                ))}
            </div>
        </form>
    )
}

export default TagSelector