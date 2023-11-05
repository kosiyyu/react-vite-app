import "../../css/custom.css"
import PropTypes from "prop-types"

ButtonCorrect.propTypes = {
    children: PropTypes.string,
    onClick: PropTypes.func,
    ariaBusy: PropTypes.bool,
    ariaLabel: PropTypes.string
}
function ButtonCorrect(props) {
    return (
        <button 
            onClick={props.onClick} 
            aria-busy={props.ariaBusy} 
            aria-label={props.ariaLabel} 
            className="green"
        >
            {props.children}
        </button>
    )
}

export default ButtonCorrect