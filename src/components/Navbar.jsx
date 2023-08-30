import { useEffect } from 'react'
import setThemeStrategy from '../theme/setThemeStrategy'
import ThemeStrategy from '../enum/ThemeStrategy'
import { Link } from 'react-router-dom'

function Navbar() {

    const changeTheme = (themeStrategy) => {
      setThemeStrategy(themeStrategy)
    }

    useEffect(()=>{
      changeTheme(ThemeStrategy.AUTO)
    }, [])

    return(
      <>
        <nav className="container-fluid">
        <ul>
          <li>
            <Link to="/" className="primary">
              <strong>Kot morderca nie ma serca</strong>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <details role="list">
              <summary role="link" className="secondary">Theme</summary>
              <ul>
                <li>
                  <a onClick={()=>{changeTheme(ThemeStrategy.LIGHT)}}>🌇 Light theme</a>
                </li>
                <li>
                  <a onClick={()=>{changeTheme(ThemeStrategy.DARK)}}>🌃 Dark theme</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details role="list">
              <summary role="link" className="secondary">Resource Links</summary>
              <ul role="listbox">
                <li><Link to="/">🏠 Home</Link></li>
                <li><Link to="/articles">📰 Articles</Link></li>
                <li><Link to="/settings">⚙️ Settings</Link></li>
                <li><Link to="/tags">🏷️ Tags</Link></li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </>
    )
}

export default Navbar