import { Link } from "react-router-dom"
import "../css/custom.css"
import PropTypes from 'prop-types'

TagRedirect.propTypes = {
    children: PropTypes.node.isRequired,
    tagId: PropTypes.number.isRequired,
}
function TagRedirect(props) {
    const tagStyle = {
        backgroundColor: `hsl(10%, 30%, 50%)`,
        cursor: 'pointer'
    }

    return (
        <>
            <Link to={`/tag/${props.tagId}`}>
                <kbd id="tag" style={tagStyle}>{props.children.toLowerCase()}</kbd>
            </Link>
        </>
    )
}

export default TagRedirect
