import { useState } from "react"

function TagNotFoundModal(){
    const [isOpen, setIsOpen] = useState(true)

    const saveTag = () => {
        // todo
        throw new Error("not implemented yet")
    }

    return (
    <dialog open={isOpen}>
        <article>
            <h2>Tag not found</h2>
            <p>
                Do you whant to add selected Tag?
            </p>
            <footer className="group">
                <button onClick={saveTag}>
                    Yes
                </button>
                <button onClick={() => setIsOpen(false)} className="secondary">
                    No
                </button>
            </footer>
        </article>
    </dialog>
    )
}

export default TagNotFoundModal