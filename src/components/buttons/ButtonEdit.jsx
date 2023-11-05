import "../../css/custom.css"
import PropTypes from "prop-types"

ButtonEdit.propTypes = {
    children: PropTypes.string,
    onClick: PropTypes.func,
    ariaBusy: PropTypes.bool,
    ariaLabel: PropTypes.string
}
function ButtonEdit(props) {
    return (
        <button 
            onClick={props.onClick} 
            aria-busy={props.ariaBusy} 
            aria-label={props.ariaLabel} 
            className="orange-yellow"
        >
            {props.children}
        </button>
    )
}

export default ButtonEdit