import { useState, useEffect } from 'react'
import { ARTICLES_DOWNLOAD_URL } from "../global"
import axios from 'axios'
import Tag from '../components/Tag'
import { Link } from 'react-router-dom'

function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        axios.get(ARTICLES_DOWNLOAD_URL)
            .then(response => {
                setArticles(response.data)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return(
        <section id="preview">
            {isLoading ? <div aria-busy="true">Please wait…</div> :
                <table role="grid">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title 1</th>
                        <th scope="col">Issn 1</th>
                        <th scope="col">Eissn 1</th>
                        <th scope="col">Title 2</th>
                        <th scope="col">Issn 2</th>
                        <th scope="col">Eissn 2</th>
                        <th scope="col">Tags</th>
                        <th scope="col">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article, index) => (
                        <tr scope="row" key={index}>
                            <td><Link to={`/article/${article.id}`}>{index + 1}</Link></td>
                            <td>{article.title1}</td>
                            <td>{article.issn1}</td>
                            <td>{article.eissn1}</td>
                            <td>{article.title2}</td>
                            <td>{article.issn2}</td>
                            <td>{article.title2}</td>
                            <td>{article.points}</td>
                            <td>
                                {article.tags.map((tag, tagIndex) => (
                                    <Tag tagId={tag.id} key={tagIndex}>{tag.value}</Tag>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
        </section>
    )
}

export default ArticleList