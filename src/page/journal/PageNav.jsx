import { useContext } from 'react'
import { SearchTokenContext } from '../../context/SearchTokenProvider'

function PageNav() {
    const { state, dispatch, pageInfo, setSent} = useContext(SearchTokenContext)

    function isNext() {
        return state.pageIndex + 1 < pageInfo.numberOfPages
    }

    function isPrevious() {
        return state.pageIndex > 0
    }

    const previous = () => {
        const pageIndex = state.pageIndex - 1
        const newSearchToken = {...state, pageIndex: pageIndex}
        dispatch({type: "UPDATE", value: {searchToken: newSearchToken}})
        setSent(s => !s)
    }

    const next = () => {
        const pageIndex = state.pageIndex + 1
        const newSearchToken = {...state, pageIndex: pageIndex}
        dispatch({type: "UPDATE", value: {searchToken: newSearchToken}})
        setSent(s => !s)
    }

    function firstNumber(){
        if(pageInfo.numberOfPages === 0)
            return 0
        return state.pageIndex + 1<= 0 ? 1 : state.pageIndex + 1
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