'use client'
import styles from "@/css/main.module.css";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Header(){
    const {theme, setTheme} = useTheme();

    function setNextTheme(){
        setTheme(theme == 'dark' ? 'light' : 'dark');
    }
    

    return(
        <header className={`${styles.header} ${theme == 'dark' ? styles.dark : styles.light}`}>
            <Link href={`/home`}>
                <h1 className={styles.headerText}>Where in the world?</h1>
            </Link>
            <button className={styles.themeButton}onClick={setNextTheme}>
                <img src={theme == 'dark' ? '/moon-svgrepo-com(1).svg' : '/sun-svgrepo-com(1).svg'}/>
                {theme == 'dark' ? 'Dark Mode' : 'Light Mode'}
            </button>
        </header>
    )
}