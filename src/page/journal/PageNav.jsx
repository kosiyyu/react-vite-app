import PropTypes from 'prop-types'
import { useEffect } from 'react'

PageNav.propTypes = {
    pageData: PropTypes.object.isRequired,
    setPageNumber: PropTypes.func.isRequired
}
function PageNav(props) {//setPageNumber
    function displayNext() {
        return props.pageData.pageNumber + 1 < props.pageData.numberOfPages
    }

    function displayPrevious() {
        return props.pageData.pageNumber > 0
    }

    const previous = () => {
        props.setPageNumber(props.pageData.pageNumber - 1)
    }

    const next = () => {
        props.setPageNumber(props.pageData.pageNumber + 1)
    }

    return (
        <>Page {props.pageData.pageNumber + 1} out of {props.pageData.numberOfPages} {displayPrevious() ? <> | <a onClick={previous}>previous</a></> : ''} {displayNext() ? <> | <a onClick={next}>next</a></> : ''} </>
    )
}

export default PageNav