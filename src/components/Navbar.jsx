import { useEffect } from 'react'
import setThemeStrategy from '../theme/setThemeStrategy'
import ThemeStrategy from '../theme/ThemeStrategy'
import { Link } from 'react-router-dom'
import csv from "../assets/icons/csv.svg"
import icon from "../assets/icons/icon.svg"
import "../css/custom.css"

function Navbar() {
    const changeTheme = (themeStrategy) => {
      setThemeStrategy(themeStrategy)
    }

    useEffect(()=>{
      changeTheme(ThemeStrategy.AUTO)
    }, [])

    return(
      <div className='nav'>
        <nav className="container-fluid">
        <ul>
          <li>
            <Link to="/" className="primary">
              <img src={icon} width="65" height="65"/>
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
                <li><Link to="/journals">📰 Journals</Link></li>
                <li><Link to="/tags">🏷️ Tags</Link></li>
                <li><Link to="/csv"><img className='img' src={csv}/> Csv</Link></li>
                <li><Link to="/settings">⚙️ Settings</Link></li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
      <div className='nav-bottom'/>
    </div>
    )
}

export default Navbar