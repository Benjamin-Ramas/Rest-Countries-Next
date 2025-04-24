'use client'
import styles from '@/css/main.module.css'
import { ReactNode, useEffect, useState } from 'react';
import Header from './header';
export enum THEME {
    DEFAULT,
    LIGHTMODE,
    DARKMODE
}

function getTheme(){
    const theme = sessionStorage.getItem('rest-theme');
    console.log(sessionStorage.getItem('rest-theme'))
    if(theme == null){
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
            return THEME.DARKMODE;
        }
        else{
            return THEME.LIGHTMODE;
        }
    }else if(theme == 'darkmode'){
            return THEME.DARKMODE;
    }else{
        return THEME.LIGHTMODE;
    }
}

export default function StyleWrapper( {children}: {children: ReactNode}){
    const [siteTheme, setSiteTheme] = useState<THEME>(THEME.DEFAULT);

    function changeTheme(){
        setSiteTheme(siteTheme == THEME.LIGHTMODE ? THEME.DARKMODE : THEME.LIGHTMODE);
        sessionStorage.setItem('rest-theme', siteTheme == THEME.LIGHTMODE ? 'darkmode' : 'lightmode');
    }

    useEffect(() => {
        setSiteTheme(getTheme());
        console.log(getTheme())
    }, []);

    useEffect(() => {
        console.log(siteTheme);
    }, [siteTheme])

    const classStyle: string = siteTheme == THEME.DARKMODE ? styles.darkmode : styles.lightmode;

    return(
        <div className={`${styles.styleWrapper} ${classStyle}`}>
            <Header themeChange={changeTheme} classname={classStyle} theme={siteTheme}></Header>
            {children}
        </div>
    )
}