//import PropTypes from 'prop-types'
import { useState } from 'react'

function SelectTagModal(){
    const [isOpen, setIsOpen] = useState(true)

    const closeModal = () => {
        // todo
        
        //
        setIsOpen(false)
    }

    const add = () => {
        // todo
        throw new Error("not implemented yet")
    }

    return (
    <dialog open={isOpen}>
        <article>
            <h2>Selected tag found</h2>
            <p>
                Are you sure you whant to add it?
            </p>
            <footer className="group">
                <button onClick={() => add()}>
                    Yes
                </button>
                <button onClick={() => closeModal()} className="secondary">
                    No
                </button>
            </footer>
        </article>
    </dialog>
    )
}

export default SelectTagModal