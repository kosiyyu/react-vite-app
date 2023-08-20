import { useEffect } from 'react'
import setThemeStrategy from '../theme/setThemeStrategy'
import ThemeStrategy from '../enum/ThemeStrategy'

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
            <a href="./" className="primary">
              <strong>Kot morderca nie ma serca</strong>
            </a>
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
                <li><a href="../home/">🏠 Home</a></li>
                <li><a href="../articles/">📰 Articles</a></li>
                <li><a href="../settings/">⚙️ Settings</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </>
    )
}

export default Navbar