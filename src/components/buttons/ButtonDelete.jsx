import "../../css/custom.css"
import PropTypes from "prop-types"

ButtonDelete.propTypes = {
    children: PropTypes.string,
    onClick: PropTypes.func,
    ariaBusy: PropTypes.bool,
    ariaLabel: PropTypes.string
}
function ButtonDelete(props) {
    return (
        <button 
            onClick={props.onClick} 
            aria-busy={props.ariaBusy} 
            aria-label={props.ariaLabel} 
            className="red"
        >
            {props.children}
        </button>
    )
}

export default ButtonDelete