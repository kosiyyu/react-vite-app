import { useState, useEffect } from 'react'
import { JOURNALS_TOKENIZED_DOWNLOAD_URL } from "../global"
import axios from 'axios'
import Tag from './Tag'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import PageNav from '../page/journal/PageNav'

JournalList.propTypes = {
    searchToken: PropTypes.object.isRequired
}
function JournalList(props) {
    const [journals, setJournals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [pageData, setPageData] = useState(
        {
            "numberOfPages": 0,
            "pageNumber": 0,
        }
    )
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(()=>{
        setPageData({
            "numberOfPages": 0,
            "pageNumber": 0,
        })
        axios.post(JOURNALS_TOKENIZED_DOWNLOAD_URL, JSON.stringify({...props.searchToken, "pageIndex": 0}), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                setJournals(response.data.journals)
                setPageData(
                    {
                        numberOfPages: response.data.numberOfPages,
                        pageNumber: 0
                    }
                )
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }, [props.searchToken])

    useEffect(()=>{
        axios.post(JOURNALS_TOKENIZED_DOWNLOAD_URL, JSON.stringify({...props.searchToken, "pageIndex": pageNumber}), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                setJournals(response.data.journals)
                setPageData(
                    {
                        numberOfPages: response.data.numberOfPages,
                        pageNumber: pageNumber
                    }
                )
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }, [pageNumber])

    return(
        <section id="preview">
            {isLoading ? <div aria-busy="true">Please wait…</div> :
                <>
                    <PageNav pageData={pageData} setPageNumber={setPageNumber}></PageNav>
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
                                    <td><Link to={`/journal/${journal.id}`}>{index + 1}</Link></td>
                                    <td>{journal.id !== '' ? journal.id : '-'}</td>
                                    <td>{journal.title1 !== '' ? journal.title1 : '-'}</td>
                                    <td>{journal.issn1 !== '' ? journal.issn1 : '-'}</td>
                                    <td>{journal.eissn1 !== '' ? journal.eissn1 : '-'}</td>
                                    <td>{journal.title2 !== '' ? journal.title2 : '-'}</td>
                                    <td>{journal.issn2 !== '' ? journal.issn2 : '-'}</td>
                                    <td>{journal.eissn2 !== '' ? journal.eissn2 : '-'}</td>
                                    <td>{journal.points !== '' ? journal.points : '-'}</td>
                                    <td>
                                        {journal.tags.map((tag, tagIndex) => (
                                            <Tag tagId={tag.id} key={tagIndex}>{tag.value}</Tag>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <PageNav pageData={pageData} setPageNumber={setPageNumber}></PageNav>
                </>
            }
        </section>
    )
}

export default JournalList