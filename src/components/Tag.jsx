import "../css/custom.css"

function Tag(props) {

    return (
        <>
            <kbd id="tag">{props.children}</kbd>
        </>
    )
}

export default Tag
