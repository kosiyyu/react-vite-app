import "../../css/custom.css"
import PropTypes from 'prop-types'

TagDisplay.propTypes  = {
    children: PropTypes.node.isRequired,
}

function TagDisplay(props) {
    const tagStyle = {
        backgroundColor: `hsl(10%, 30%, 50%)`,
    };

    return <kbd id="tag" style={tagStyle}>{props.children.toLowerCase()}</kbd>
    
}

export default TagDisplay
