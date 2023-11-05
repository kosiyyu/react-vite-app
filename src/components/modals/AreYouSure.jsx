import PropTypes from "prop-types"
import { useState } from "react"

AreYouSure.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    returnSate: PropTypes.func.isRequired
}
function AreYouSure(props) {
    const [isOpen, setIsOpen] = useState(props.isOpen)

    const handleYes = () => {
        props.returnSate(true)
        setIsOpen(false)
    }

    const handleNo = () => {
        props.returnSate(true)
        setIsOpen(false)
    }

    return (
        <dialog open={isOpen}>
            <article>
                <h3>Are you sure?</h3>
                <footer>
                    <div className="grid">
                        <button onClick={handleYes}>Yes</button>
                        <button onClick={handleNo}>No</button>
                    </div>
                </footer>
            </article>
        </dialog>
    )
}

export default AreYouSure