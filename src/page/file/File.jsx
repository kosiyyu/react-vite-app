import { useState, useEffect } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/esm/Page/TextLayer.css"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import PropTypes from "prop-types"

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js",import.meta.url).toString()

File.propTypes = {
    fullFilename: PropTypes.string.isRequired,
    file: PropTypes.object.isRequired
}
function File(props) {
    const [fullFilename] = useState(props.fullFilename)
    const [file] = useState(props.file)
    const [pdf, setPdf] = useState()
    const [isPdf, setIsPdf] = useState(false)
    const [blobUrl, setBlobUrl] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [numPages, setNumPages] = useState(null)

    useEffect(() => {
        if (fullFilename.endsWith(".pdf")) {
            setIsPdf(true)
            const byteArray = new Uint8Array(file)
            const pdfBlob = new Blob([byteArray], { type: "application/pdf" })
            setPdf(pdfBlob)
        }
        const blob = URL.createObjectURL(new Blob([file]))
        setBlobUrl(blob)
    }, [])

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
    }

    const incrementPage = (e) => {
        e.preventDefault()
        setPageNumber(x => x + 1)
    }

    const decrementPage = (e) => {
        e.preventDefault()
        setPageNumber(x => x - 1)
    }

    function displayNextPage(){
        if(pageNumber >= numPages)
            return ""
        return <>| <a onClick={incrementPage}>next page</a></>
    }

    function displayPreviousPage(){
        if(pageNumber <= 1)
            return ""
        return <>| <a onClick={decrementPage}>previous page</a></>
    }

    function displayPageNav() {
        return <p>Page {pageNumber} out of {numPages} {displayNextPage()} {displayPreviousPage()}</p>
    }

    function displayPdf() {
        if(!isPdf)
            return <p>No PDF file specified.</p>
        return (
            <>
                <br />
                {displayPageNav()}
                <div style={{ width: "52.55%", height: "100%"}}>
                    <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document>
                </div>
                <br />
                {displayPageNav()}
            </>
        )
    }

    return (
        <div className="container">
            <hgroup>
                <h1>File {fullFilename}</h1>
                <h2>Welcome to the File viewer. You can download a file, and if it’s a PDF, it will be displayed below.</h2>
            </hgroup>
            <hr />
            <label>You can download a file <a href={blobUrl} download={fullFilename}>here</a></label>
            {displayPdf()}
        </div>
    )
}

export default File