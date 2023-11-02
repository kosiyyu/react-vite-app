import "../css/custom.css"
import PropTypes from 'prop-types'

TagNormal.propTypes  = {
    children: PropTypes.node.isRequired,
    tagId: PropTypes.number.isRequired,
    onClick: PropTypes.func
}

function TagNormal(props) {
    // const num = props.tagId
    // const n = 10 // numer of colors
    // const jump = 30 // jump value
    
    // // const n = 30 // numer of colors
    // // const jump = 10 // jump value

    // const tagStyle = {
    //     //backgroundColor: `hsl(${((num % n) + 1) * jump}, 100%, 50%)`
    //     backgroundColor: `hsl(${((num % n) + 1) * jump}, 100%, 50%)`
    // };

    const tagStyle = {
        backgroundColor: `hsl(10%, 30%, 50%)`,
        cursor: 'pointer'
    };

    return (
        <>
            {/* <kbd id="tag" style={tagStyle}>{props.children}</kbd> */}
            <kbd id="tag" style={tagStyle} onClick={props.onClick}>{props.children.toLowerCase()}</kbd>
        </>
    )
}

export default TagNormal
