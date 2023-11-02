import PropTypes from "prop-types"

Tag.propTypes = {
    tagData: PropTypes.object.isRequired
}
function Tag(props){
    const tag = props.tagData
    
    function displayTag(){
        return (
        <>
            <h1>Tag</h1>
            <h6><a>:: edit tag ::</a></h6>
            <ul>
                <li><strong>Id: </strong>{tag.id}</li>
                <li><strong>Tag: </strong>{tag.value}</li>
            </ul>
        </>        
        )
    }

    return displayTag()
}

export default Tag