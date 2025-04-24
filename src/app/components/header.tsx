import styles from "@/css/main.module.css";
import { THEME } from "./styleWrapper";


export default function Header({ themeChange, classname, theme }: {themeChange: () => void, classname: string, theme: THEME}){
    return(
        <header className={`${styles.header} ${classname}`}>
            <h1 className={styles.headerText}>Where in the world?</h1>
            <button className={styles.themeButton}onClick={themeChange}>
                <img src={theme == THEME.DARKMODE ? '/moon-svgrepo-com(1).svg' : '/sun-svgrepo-com(1).svg'}/>
                {theme == THEME.DARKMODE ? 'Dark Mode' : 'Light Mode'}
            </button>
        </header>
    )
}