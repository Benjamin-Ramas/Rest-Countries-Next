'use client'
import Header from "../components/header";
import styles from "../../css/main.module.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Loading from "./loading";
import GetCountries from "../utils/getCountry";
import { countryCardInfo } from "../components/countrycard";
import CountryCard from "../components/countrycard";

export default function Page(){
    const {theme} = useTheme();
    const [isLoading, setLoading] = useState(true);
    const [countries, setCountries] = useState<countryCardInfo[]>([]);
    const [regionFilter, setRegionFilter] = useState('All');
    const [nameFilter, setNameFilter] = useState('');

    useEffect(() => {
        setLoading(false);
        GetCountries(setCountries)
    }, []);

    if(isLoading){
        return(
            <Loading />
        )
    }

    return(
        <div className={`${styles.page} ${theme == 'dark' ? styles.dark : styles.light}`}>
            <Header />
            <input 
                type="text"
                placeholder="Search for a country"
                onChange={(e) => setNameFilter(e.target.value)}
            />
            <main className={styles.countryCardHolder}>
                {countries.length > 0 ? countries.map(n => <CountryCard key={n.name.common} nameFilter={nameFilter} regionFilter={regionFilter} info={n}/>) : <></>}
            </main>
        </div>
    )
}