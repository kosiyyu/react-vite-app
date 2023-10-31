import { createContext, useEffect, useReducer, useState } from "react"
import useIsMount from "../hooks/useIsMount"
import PropTypes from "prop-types"

export const defaultSearchToken = {
    "searchStrings": [],
    "tagStrings": [],
    "orderByArgument": "",
    "pageIndex": 0,
    "pageSize": 5,
    "isDescSort": false
}

export const defaultPageInfo = {
    "numberOfPages": 0,
    "pageNumber": 0,
}

export const SearchTokenContext = createContext(undefined)

function reducer(state, action){
    switch(action.type){
        case "UPDATE":
            return {...state, ...action.value.searchToken}
        case "RESET":
            return {...state, ...action.value.searchToken}
        default:
            console.log("DEFAULT")
            return state
    }
}

SearchTokenProvider.propTypes = {
    children: PropTypes.element.isRequired
}
export default function SearchTokenProvider({children}) {
    const [state, dispatch] = useReducer(reducer, defaultSearchToken)
    const [pageInfo, setPageInfo] = useState(defaultPageInfo)
    const [reset, setReset] = useState(false)
    const [sent, setSent] = useState(false)
    const [buttonSent, setButtonSent] = useState(false)
    const isMount = useIsMount()

    useEffect(()=>{
        if(isMount)
            return
        if(JSON.stringify(state) === JSON.stringify(defaultSearchToken)){
            setReset(r => !r)
        }
    }, [state])

    return (
        <SearchTokenContext.Provider value={{state, dispatch, reset, setReset, pageInfo, setPageInfo, sent, setSent, buttonSent, setButtonSent}}>
            {children}
        </SearchTokenContext.Provider>
    )
}