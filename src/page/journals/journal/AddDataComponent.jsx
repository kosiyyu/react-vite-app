import { useState } from 'react'
import axios from 'axios'
import { applicationJson } from '../../../headers/headers'
import { WEB_CRAWLER_URL } from '../../../global'
import ButtonCorrect from '../../../components/buttons/ButtonCorrect'
import ButtonDelete from '../../../components/buttons/ButtonDelete'
import toast from 'react-hot-toast'
import '../../../css/custom.css'
import PropTypes from 'prop-types'

const displayErrorToast = (msg) => toast.error(msg)
const displaySuccessToast = (msg) => toast.success(msg)

AddDataComponent.propTypes = {
    journalNewState: PropTypes.object.isRequired,
    setJournalNewState: PropTypes.func.isRequired,
    isAddData: PropTypes.bool.isRequired,
}
function AddDataComponent({ journalNewState, setJournalNewState, isAddData }) {
    const [citeScore, setCiteScore] = useState(null)
    const [aimsAndScope, setAimsAndScope] = useState('')
    const [isFetching, setIsFetching] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleAccept = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setJournalNewState(prevState => ({
            ...prevState,
            citeScore: parseFloat(citeScore),
            aimsAndScope: aimsAndScope
        }))
        setCiteScore(null)
        setAimsAndScope('')
        setIsLoading(false)
    }

    const handleReject = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setCiteScore(null)
        setAimsAndScope('')
        setIsLoading(false)
    }

    function addDataFetch(value) {
        setIsFetching(true)
        axios.get(`${WEB_CRAWLER_URL(value)}`, applicationJson)
            .then((response) => {
                console.log(response.data)
                if (!response.data || !Array.isArray(response.data) || response.data.length == 0){
                    displayErrorToast('No data found.')
                }
                else {
                    let isCiteScore = false
                    let isAimsAndScope = false
                    response.data.forEach((obj) => {
                        if ('CiteScore' in obj) {
                            const match = obj['CiteScore'].match(/\d+(\.\d+)?/)
                            if (match) {
                                const number = match[0]
                                if (!isNaN(number)) {
                                    setCiteScore(number)
                                    isCiteScore = true
                                }
                            }
                        }
                        if ('Aims and Scope' in obj) {
                            setAimsAndScope(obj['Aims and Scope'])
                            isAimsAndScope = true
                        }
                    })
                    
                    if(!isCiteScore && !isAimsAndScope){
                        displayErrorToast('No data found.')   
                    }
                    else if(!isCiteScore){
                        displaySuccessToast('Aims and scope found.')
                        displayErrorToast('Cite score found.')
                    }
                    else if(!isAimsAndScope){
                        displaySuccessToast('Aims and scope found.')  
                        displayErrorToast('No aims and scope found.')   
                    }
                    else displaySuccessToast('Data found.')
                }
                setIsFetching(false)
            })
            .catch((error) => { console.log(error); setIsFetching(false) })
    }

    function displayButtonFetch(){
        if(isFetching)
            return <button aria-busy={true} aria-label="Please wait…"  />
        return <button onClick={() => addDataFetch(journalNewState.issn1)}>Fetch</button>
    }

    function displayButtonCorrect(){
        if(isLoading)
            return <ButtonCorrect aria-busy={true} aria-label="Please wait…"  />
        return <ButtonCorrect onClick={handleAccept} type='submit'>Accept</ButtonCorrect>
    }

    function displayButtonDelete(){
        if(isLoading)
            return <ButtonDelete aria-busy={true} aria-label="Please wait…"  />
        return <ButtonDelete onClick={handleReject} type='reset'>Reject</ButtonDelete>
    }

    if (!isAddData) {
        return ''
    }
    return (
        <div>
            <br />
            {displayButtonFetch()}
            <form>
                <label>CiteScore</label>
                <input name='citescore' placeholder='CiteScore' type='number' value={citeScore || ''} onChange={e => setCiteScore(e.target.value)} className='no-spin-buttons ' />
                <label>Aims and Scope</label>
                <textarea 
                    name='aimsandscope' 
                    placeholder='Aims and Scope' 
                    maxLength='8191'
                    rows='5' value={aimsAndScope || ''} 
                    onChange={e => setAimsAndScope(e.target.value)} 
                />
                <div className='grid'>
                    {displayButtonCorrect()}
                    {displayButtonDelete()}
                </div>
            </form>
        </div>
    )
}

export default AddDataComponent