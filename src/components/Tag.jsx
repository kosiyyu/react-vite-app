import "../css/custom.css"
import PropTypes from 'prop-types'

Tag.propTypes  = {
    children: PropTypes.node.isRequired
}

function Tag(props) {

    const tagStyle = {
        backgroundColor: 'hsl(30, 50%, 60%)'
    };

    return (
        <>
            <kbd id="tag" style={tagStyle}>{props.children}</kbd>
        </>
    )
}

export default Tag
