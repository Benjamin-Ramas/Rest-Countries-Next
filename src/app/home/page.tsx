'use client'
import Header from "../components/header";
import styles from "@/css/countryCardHolder.module.css";
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
        setRegionFilter('All')
    }, []);

    if(isLoading){
        return(
            <Loading />
        )
    }

    return(
        <div className={`${styles.page} ${theme == 'dark' ? styles.dark : styles.light}`}>
            <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌐</text></svg>`}></link>
            <Header />
            <section className={styles.filtersHolder}>
                <div className={styles.countrySearch}>
                    <img src='/magnifying-glass-svgrepo-com.svg' alt="magnifying glass" />
                    <input
                    type="text"
                    placeholder="Search for a country..."
                    onChange={(e) => {console.log(e.target.value); setNameFilter(e.target.value)}}
                    />
                </div>
            <label className={styles.regionFilter}>
                    <select onChange={(e) => setRegionFilter(e.target.value)}>
                        <option value={'All'}>Filter by Region</option>
                        <option value={'Africa'}>Africa</option>
                        <option value={'Americas'}>America</option>
                        <option value={'Asia'}>Asia</option>
                        <option value={'Europe'}>Europe</option>
                        <option value={'Oceania'}>Oceania</option>
                    </select>
                </label>
            </section>
            <main className={styles.countryCardHolder}>
                {countries.length > 0 ? countries.map(n => <CountryCard key={n.name.common} nameFilter={nameFilter} regionFilter={regionFilter} info={n}/>) : <></>}
            </main>
        </div>
    )
}