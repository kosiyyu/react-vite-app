import PropTypes from 'prop-types'

Header.propTypes = {
    children: PropTypes.node.isRequired
}

function Header({children}) {
    return(
        <hgroup>
            <h1>{children}</h1>
            <h2>You can specify sth ble ble</h2>
        </hgroup>
    )
}

export default Header