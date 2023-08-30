import "../css/custom.css"
import PropTypes from 'prop-types'

Tag.propTypes  = {
    children: PropTypes.node.isRequired,
    tagId: PropTypes.number.isRequired
}

function Tag(props) {

    const num = props.tagId
    const n = 10 // numer of colors
    const jump = 30 // jump value
    
    
    // const n = 30 // numer of colors
    // const jump = 10 // jump value

    const tagStyle = {
        //backgroundColor: `hsl(${((num % n) + 1) * jump}, 100%, 50%)`
        backgroundColor: `hsl(${((num % n) + 1) * jump}, 100%, 50%)`
    };

    return (
        <>
            <kbd id="tag" style={tagStyle}>{props.children}</kbd>
        </>
    )
}

export default Tag
