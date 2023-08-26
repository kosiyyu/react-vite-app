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
                            <td>{index + 1}</td>
                            <td>{article.title1}</td>
                            <td>{article.issn1}</td>
                            <td>{article.eissn1}</td>
                            <td>{article.title2}</td>
                            <td>{article.issn2}</td>
                            <td>{article.title2}</td>
                            <td>
                                {/* dummy tags */}
                                <Link><Tag>Informatyka</Tag></Link>
                                <Link><Tag>Fizyka molekularna</Tag></Link>
                                <Link><Tag>Matematyka</Tag></Link>
                                <Link><Tag>IT</Tag></Link>
                                <Link><Tag>ML</Tag></Link>
                                <Link><Tag>System</Tag></Link>
                                <Link><Tag>Book</Tag></Link>
                                <Link><Tag>OSLA</Tag></Link>
                                <Link><Tag>Science material</Tag></Link>
                                <Link><Tag>MIT-LICENCE</Tag></Link>
                                <Link><Tag>Research</Tag></Link>
                                <Link><Tag>Thesis</Tag></Link>
                                <Link><Tag>FFA</Tag></Link>
                                <Link><Tag>Limbo</Tag></Link>
                                <Link><Tag>DAtabase</Tag></Link>
                                <Link><Tag>ORM</Tag></Link>
                        </td>

                        </tr>
                    ))}
                </tbody>
            </table>

        </section>
    )
}

export default ArticleList