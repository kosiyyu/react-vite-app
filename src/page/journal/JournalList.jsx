import { useState, useEffect, useContext } from 'react'
import { JOURNALS_TOKENIZED_DOWNLOAD_URL } from "../../global"
import axios from 'axios'
import TagRedirect from '../../components/tags/TagRedirect'
import { Link } from 'react-router-dom'
import PageNav from './PageNav'
import { SearchTokenContext } from '../../context/SearchTokenProvider'
import useIsMount from '../../hooks/useIsMount'

function JournalList() {
    const [journals, setJournals] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)

    const { display, state, dispatch, pageInfo, setPageInfo, sent, buttonSent } = useContext(SearchTokenContext)

    const isMount = useIsMount()

    useEffect(() => {
        axios.post(JOURNALS_TOKENIZED_DOWNLOAD_URL, JSON.stringify(display), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                setJournals(response.data.journals)
                console.log('JournalList: SUCESS')
                setPageInfo({
                    numberOfPages: response.data.numberOfPages,
                    pageNumber: response.data.pageNumber
                })
                console.log(display)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(`JournalList: ERROR | ${error}`)
            })
    }, [sent])

    useEffect(() => {
        if (isMount)
            return
        const newSearchToken = { ...state, pageIndex: 0 }
        // SENT NEW STATE (NOT SAVED YET)   
        axios.post(JOURNALS_TOKENIZED_DOWNLOAD_URL, JSON.stringify(newSearchToken), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                setJournals(response.data.journals)
                console.log('JournalList: SUCESS')
                setPageInfo({
                    numberOfPages: response.data.numberOfPages,
                    pageNumber: response.data.pageNumber
                })
                // SAVE NEW STATE NOW
                dispatch({ type: "UPDATE", value: { searchToken: newSearchToken } })
                console.log(newSearchToken)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(`JournalList: ERROR | ${error}`)
            })
    }, [buttonSent])

    function indexValue(index) {
        if (state.pageSize > 100)
            return index + 100 * pageInfo.pageNumber + 1
        return index + state.pageSize * pageInfo.pageNumber + 1
    }

    function displayJournals() {
        if (journals === undefined)
            return <p>Loading...</p>
        return (
            <table role="grid">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Id</th>
                        <th scope="col">Title 1</th>
                        <th scope="col">Issn 1</th>
                        <th scope="col">E-issn 1</th>
                        <th scope="col">Title 2</th>
                        <th scope="col">Issn 2</th>
                        <th scope="col">E-issn 2</th>
                        <th scope="col">Points</th>
                        <th scope="col">Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {journals.map((journal, index) => (
                        <tr scope="row" key={index}>
                            <td><Link to={`/journal/${journal.id}`}>{indexValue(index)}</Link></td>
                            <td>{journal.id !== '' ? journal.id : '-'}</td>
                            <td>{journal.title1 !== '' ? journal.title1 : '-'}</td>
                            <td>{journal.issn1 !== '' ? journal.issn1 : '-'}</td>
                            <td>{journal.eissn1 !== '' ? journal.eissn1 : '-'}</td>
                            <td>{journal.title2 !== '' ? journal.title2 : '-'}</td>
                            <td>{journal.issn2 !== '' ? journal.issn2 : '-'}</td>
                            <td>{journal.eissn2 !== '' ? journal.eissn2 : '-'}</td>
                            <td>{journal.points !== '' ? journal.points : '-'}</td>
                            <td>
                                {displayTags(journal.tags)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    function displayTags(tags) {
        if (tags.length > 0)
            return (
                <>
                    {tags.map((tag, index) => (
                        <TagRedirect tagId={tag.id} key={index}>{tag.value}</TagRedirect>
                    ))}
                </>
            )
        else return "-"
    }

    return (
        <section id="preview">
            <br></br>
            <PageNav />
            {displayJournals()}
            <PageNav />
        </section>
    )
}

export default JournalList