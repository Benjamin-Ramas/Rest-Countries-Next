'use client'
import Header from "../components/header";
import styles from "../../css/main.module.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Page(){
    const {theme} = useTheme();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if(isLoading){
        return(
            <Loading />
        )
    }

    return(
        <div className={`${styles.page} ${theme == 'dark' ? styles.dark : styles.light}`}>
            <Header />
            <h1>HOME</h1>
        </div>
    )
}