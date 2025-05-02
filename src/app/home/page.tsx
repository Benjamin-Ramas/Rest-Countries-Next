'use client'
import Header from "../components/header";
import styles from "../../css/main.module.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Loading from "./loading";

const fetchApiData = async () => {
    try{
        const response = await fetch('/api/get_specific_country/belgium')
        .then((response) => response.json())
        .then((response) => {
            console.log(response.posts[0]);
        })
    } catch(err){
        console.error(err);
    }
}

export default function Page(){
    const {theme} = useTheme();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetchApiData();
        setLoading(false);
    }, []);

    if(isLoading){
        return(
            <Loading />
        )
    }

    return(
        <div className={`${styles.page} ${theme == 'dark' ? styles.dark : styles.light}`}>
            <title>Test</title>
            <Header />
            <h1>HOME</h1>
        </div>
    )
}