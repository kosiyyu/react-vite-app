import { useParams } from "react-router-dom"
import NotFound from "../error/NotFound"
import Tag from "./Tag"
import { useEffect, useState } from "react"
import axios from "axios"
import { TAG_DOWNLOAD_URL } from "../../global"

function ValidateTag() {
    const params = useParams()
    const tagId = params.id
    const [tag, setTag] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(TAG_DOWNLOAD_URL(tagId))
        .then(response => {
            if(response.data !== undefined)
                setTag(response.data)
            setIsLoading(false)
        })
        .catch(error => {
            console.log(error)
            setIsLoading(false)
        })
    }, [tagId])

    function display(){
        if(isLoading)
            return <>Loading...</>
        if(tag)
            return <Tag tagData={tag} />
        return <NotFound />
    }

    return display()
}

export default ValidateTag
