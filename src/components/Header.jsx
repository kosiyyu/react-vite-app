import PropTypes from 'prop-types'

Header.propTypes = {
    headerValue: PropTypes.string.isRequired
}

function Header(props) {
    return(
        <>
            <h1>{props.headerValue}</h1>
            <hr />
        </>
    )
}

export default Header