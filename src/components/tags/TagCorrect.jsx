import "../../css/custom.css"
import PropTypes from 'prop-types'

TagCorrect.propTypes  = {
    children: PropTypes.node.isRequired,
    tagId: PropTypes.number.isRequired,
    onClick: PropTypes.func
}

function TagCorrect(props) {
    /*
    const num = props.tagId
    const n = 10 // numer of colors
    const jump = 30 // jump value
    
    // const n = 30 // numer of colors
    // const jump = 10 // jump value

    const tagStyle = {
        //backgroundColor: `hsl(${((num % n) + 1) * jump}, 100%, 50%)`
        backgroundColor: `hsl(${((num % n) + 1) * jump}, 100%, 50%)`
    };
    */

    const tagStyle = {
        //backgroundColor: 'var(--primary)',
        backgroundColor: 'green',
        cursor: 'pointer'
    };

    return (
        <>
            {/* <kbd id="tag" style={tagStyle}>{props.children}</kbd> */}
            <kbd id="tag" style={tagStyle} onClick={props.onClick}>{props.children.toLowerCase()}</kbd>
        </>
    )
}

export default TagCorrect
