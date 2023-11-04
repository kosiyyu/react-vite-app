import "../../css/custom.css"
import PropTypes from "prop-types"

ButtonEdit.propTypes = {
    children: PropTypes.string.isRequired
}
function ButtonEdit(props) {
    return <button className="orange-yellow">{props.children}</button>
}

export default ButtonEdit