import { DEFAULT_THEME } from '../global'
import ThemeStrategy from './ThemeStrategy'

/**
 * 
 * @param {ThemeStrategy | string} themeStrategy - The theme strategy need to be (enum or string)
 * @returns 
 */
function setThemeStrategy(themeStrategy) {

    const html = document.documentElement
    const currentTheme = html.getAttribute('data-theme')
    let preferedTheme = DEFAULT_THEME

    if (!html || currentTheme === null) {
        return;
    }

    switch(themeStrategy){
        case ThemeStrategy.AUTO:            
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                preferedTheme = 'dark'
            }
            else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                preferedTheme = 'light'
            }

            if(preferedTheme === currentTheme){
                return
            }

            html.setAttribute('data-theme', preferedTheme)
            break
        case ThemeStrategy.LIGHT:
            if(currentTheme !== 'light'){
                html.setAttribute('data-theme', 'light')
            }
            break
        case ThemeStrategy.DARK:
            if(currentTheme !== 'dark'){
                html.setAttribute('data-theme', 'dark')
            }
            break
        default:
            html.setAttribute('data-theme', 'light')
            break
    }
}

export default setThemeStrategy