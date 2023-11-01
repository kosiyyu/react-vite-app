import { useContext } from 'react'
import { SearchTokenContext } from '../../context/SearchTokenProvider'

function PageNav() {
    const {display, dispatchDisplay, state, dispatch, pageInfo, setSent} = useContext(SearchTokenContext)

    function isNext() {
        return display.pageIndex + 1 < pageInfo.numberOfPages
    }

    function isPrevious() {
        return display.pageIndex > 0
    }

    const previous = () => {
        const pageIndex = display.pageIndex - 1
        const newSearchToken = {...display, pageIndex: pageIndex}
        dispatchDisplay({type: "UPDATE", value: {searchToken: newSearchToken}})
        setSent(s => !s)
    }

    const next = () => {
        const pageIndex = display.pageIndex + 1
        const newSearchToken = {...display, pageIndex: pageIndex}
        dispatchDisplay({type: "UPDATE", value: {searchToken: newSearchToken}})
        setSent(s => !s)
    }

    function firstNumber(){
        if(pageInfo.numberOfPages === 0)
            return 0
        return display.pageIndex + 1<= 0 ? 1 : display.pageIndex + 1
    }
 
    function displayPrevious() {
        if(isPrevious()){
            return <> | <a onClick={previous}>previous</a></>
        }
        else{
            return ''
        }
    }

    function displayNext() {
        if(isNext()){
            return <> | <a onClick={next}>next</a></>
        }
        else{
            return ''
        }
    }

    return (
        <>Page {firstNumber()} out of {pageInfo.numberOfPages} {displayPrevious()} {displayNext()} </>
    )
}

export default PageNav