import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Tag from '../components/Tag'
import { Link } from 'react-router-dom'

function ArticleList() {
    const [articles, setArticles] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8081/api/v1/articles/download")
            .then(response => {
                setArticles(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return(
        <section id="preview">
            <table>
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
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article, index) => (
                        <tr scope="row" key={index}>
                            <td><Link to={`/articles/${article.id}`}>{index + 1}</Link></td>
                            <td>{article.title1}</td>
                            <td>{article.issn1}</td>
                            <td>{article.eissn1}</td>
                            <td>{article.title2}</td>
                            <td>{article.issn2}</td>
                            <td>{article.title2}</td>
                            <td>
                                {article.tags.map((tag, tagIndex) => (
                                    <Tag tagId={tag.id}key={tagIndex}>{tag.value}</Tag>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </section>
    )
}

export default ArticleList