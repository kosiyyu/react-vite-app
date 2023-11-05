import "../../css/custom.css"
import PropTypes from "prop-types"

ButtonCorrect.propTypes = {
    children: PropTypes.string
}
function ButtonCorrect(props) {
    return <button className="green">{props.children}</button>
}

export default ButtonCorrect