import Tag from "../../components/Tag";
import PropTypes from "prop-types"

Journal.propTypes = {
    journalData: PropTypes.object.isRequired
}
function Journal(props) {
    const journal = props.journalData

    function displayTags(){
        if(journal.tags.length > 0)
            return (
                <>
                    {journal.tags.map((tag, index) => (
                        <Tag tagId={-1} key={index}>{tag.value}</Tag>
                    ))}
                </>
            )
        else return "-"
    }

    function displayJournal(){
        return (
            <ul>
                <li><strong>Id:</strong> {journal.id}</li>
                <li><strong>Title 1:</strong> {journal.title1}</li>
                <li><strong>Issn 1:</strong> {journal.issn1}</li>
                <li><strong>E-issn 1:</strong> {journal.eissn1}</li>
                <li><strong>Title 2:</strong> {journal.title2}</li>
                <li><strong>Issn 2:</strong> {journal.issn2}</li>
                <li><strong>E-issn 2:</strong> {journal.eissn2}</li>
                <li><strong>Tags:</strong> {displayTags()}</li>
            </ul>
        )
    }

    return (
        <>
            <h1>Journal</h1>
            <h6><a>:: edit journal ::</a></h6>
            {displayJournal()}
        </>
      )
}

export default Journal