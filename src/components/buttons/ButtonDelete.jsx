import "../../css/custom.css"
import PropTypes from "prop-types"

ButtonDelete.propTypes = {
    children: PropTypes.string.isRequired
}
function ButtonDelete(props) {
    return <button className="red">{props.children}</button>
}

export default ButtonDelete