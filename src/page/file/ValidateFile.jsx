import { useParams } from "react-router-dom"
import NotFound from "../error/NotFound"
import File from "./File"
import { useEffect, useState } from "react"
import axios from "axios"
import { FILEMETADATA_DOWNLOAD_URL } from "../../global"
import { octetStreamWithArraybuffer } from "../../headers/headers"

function ValidateFile() {
    const params = useParams()
    const metadataId = params.metadataId
    const [fullFilename, setFullFilename] = useState(undefined)
    const [file, setFile] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
    axios.get(FILEMETADATA_DOWNLOAD_URL(metadataId),octetStreamWithArraybuffer)
    .then((response) => {
        const contentDisposition = response.headers["content-disposition"]
        const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+?)"/)
        const filename = filenameMatch ? filenameMatch[1] : "Untitled"
        setFile(response.data)
        setFullFilename(filename)
        setIsLoading(false)
    })
    .catch((error) => {
        console.log(error)
        setIsLoading(false)
    })
    }, [])
  
    function display() {
        if (isLoading) return <p>Loading...</p>
        if (fullFilename && file) return <File fullFilename={fullFilename} file={file} />
        return <NotFound />
    }
  
    return display()
  }
  
  export default ValidateFile
  
