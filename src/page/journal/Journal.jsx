import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { JOURNAL_DOWNLOAD_URL } from "../../global"
import axios from "axios"
import Tag from "../../components/Tag";

function Journal() {
    const journalId = useParams().id;
    const [journal, setJournals] = useState()
    
    useEffect(()=>{
        axios.get(JOURNAL_DOWNLOAD_URL(journalId))
            .then(response => {
                console.log(response.data)
                setJournals(response.data)
            })
            .catch(error => {
                console.log(`error: ${error}`)
            })
    }, [journalId])

    return (
        <>
          {journal && (
            <>
                <div>
                <h1>Journal</h1>
                <h6><a>:: edit journal ::</a></h6>
                <ul>
                    <li><strong>Id:</strong> {journal.id}</li>
                    <li><strong>Title 1:</strong> {journal.title1}</li>
                    <li><strong>Issn 1:</strong> {journal.issn1}</li>
                    <li><strong>E-issn 1:</strong> {journal.eissn1}</li>
                    <li><strong>Title 2:</strong> {journal.title2}</li>
                    <li><strong>Issn 2:</strong> {journal.issn2}</li>
                    <li><strong>E-issn 2:</strong> {journal.eissn2}</li>
                    <li><strong>Tags:</strong></li>
                    <div>
                        {journal.tags.map((tag, index) => (
                            <Tag tagId={-1} key={index}>{tag.value}</Tag>
                        ))}
                    </div>
                </ul>
                </div>
                
            </>
          )}
        </>
      )
}

export default Journal