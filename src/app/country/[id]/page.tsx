'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchData, fetchBorders, fetchNativeNames, fetchedCountryData } from '@/app/utils/getCountry';
import Header from "@/app/components/header";
import styles from "@/css/countryData.module.css";
import Loading from "./loading"
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const defaultCountry: fetchedCountryData = {
    flag: '',
    flags: {
        png: 'https://flagcdn.com/w320/pf.png',
        alt: 'default'
    },
    name: {
        common: '',
        nativeName: [ {common: '' }]
    },
    population: 1,
    region: '',
    subregion: '',
    tld: '',
    languages: [],
    borders: {},
};

export default function Page(){
    const {theme} = useTheme();
    const router = useRouter();

    useEffect(() => {
        fetchData(countryName, setData, setMounted);
      }, [])

    const [data, setData] = useState<fetchedCountryData>(defaultCountry);
    const [isLoading, setLoading] = useState(true);
    const [isMounted, setMounted] = useState(false);

    const countryName = usePathname().split('/')[2].replace('_', ' ').replace('+', ' ');
    
    const [nativeNames, setNativeNames] = useState<string[]>([]);
    const [languages, setLanguages] = useState<string[]>(['']);
    const [borders, setBorders] = useState<string[]>(['']);

    useEffect(() => {
        if (isMounted) {
            try {
                if(data.name.nativeName != undefined){
                    fetchNativeNames(data, setNativeNames);
                }
                setLanguages(Object.keys(data.languages).map((l) => data.languages[l as keyof object]));
                fetchBorders(data, setBorders);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }
    }, [data]);

    if(isLoading){
        return(
            <Loading />
        )
    }

    return(
        <div className={`${styles.page} ${theme == 'dark' ? styles.dark : styles.light}`}>
            <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${data.flag}</text></svg>`}></link>
            <title>{`${data.name.common} Rest-Countries`}</title>
            <Header />
                <button className={styles.backButton} onClick={router.back}>
                    <img className={styles.backButtonArrow} src={'/right-arrow-svgrepo-com.svg'} />
                    Back
                </button>
                <main className={styles.countryInfo}>
                    <div role="Holds the flag of the current country" className={styles.flagHolder}>
                        <img className={styles.countryFlag} src={data.flags.png} alt={data.flags.alt}/>
                    </div>
                    <div role="Holds country information" className={styles.countryData}>
                        <h2 role="Country Name" className={styles.countryNameDisplay}>{data.name.common}</h2>
                        <ul role="List of country information" className={styles.countrySubInformation}>
                            <ul className={styles.infoSection}>
                            <li className={styles.bold}>{nativeNames[0] == '' ? '' : `Name in Native Language${nativeNames.length > 1 ? 's: ' : ':'}`}</li>
                            {   
                                nativeNames[0] == '' ?
                                <></> :
                                <ul className={styles.nativeNamesList}>{nativeNames.map(n => <li key={n}>{n}</li>)}</ul>
                            }
                            <li><span className={styles.bold}>Population: </span>{data.population}</li>
                            <li><span className={styles.bold}>Region: </span>{data.region}</li>
                            </ul>
                            <ul className={styles.infoSection}>
                            <li><span className={styles.bold}>Sub Region: </span>{data.subregion}</li>
                            <li><span className={styles.bold}>Top Level Domain: </span>{data.tld}</li>
                            <li className={styles.languageHolder}>
                                <span className={styles.bold}>Language{languages.length > 1 ? 's' : ''}: </span>
                                    {languages.map(n => `${n}${n != languages[languages.length - 1] ? ', ' : ''}`)}
                            </li>
                            </ul>
                        </ul>
                        <div role="Holds a list of bordering countries" className={styles.borderHolder}>
                            <h2 role="">{borders.length == 0 || borders[0] == ''? 'No Bordering Countries' : 'Border Countries: '}</h2>
                            <ul className={styles.borderList}>
                                {borders.length == 0 || borders[0] == '' ? <></> : borders.map(n =>
                                    <li key={n}>
                                        <Link href={`/country/${n}`} key={n}>
                                            <button key={n}>{n}</button>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </main>
        </div>
    )
}