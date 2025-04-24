'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchData, fetchBorders, fetchNativeNames, fetchedCountryData } from '@/app/utils/getCountry';
import Header from "@/app/components/header";
import BackgroundRef from "@/app/components/backgroundRef";
import styles from "@/css/main.module.css";
import StyleWrapper from "@/app/components/styleWrapper";
import { THEME } from "@/app/components/styleWrapper";
import Loading from "./loading";

const defaultCountry: fetchedCountryData = {
    flags: {
        png: 'https://flagcdn.com/w320/pf.png'
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
    useEffect(() => {
        fetchData(countryName, setData, setMounted);
      }, [])

    const [data, setData] = useState<fetchedCountryData>(defaultCountry);
    const [isLoading, setLoading] = useState(true);
    const [isMounted, setMounted] = useState(false);

    const countryName = usePathname().split('/')[2].replace('_', ' ').replace('+', ' ');
    
    const [flagPng, setFlagPng] = useState<string>('https://flagcdn.com/w320/pf.png');
    const [commonName, setCommonName] = useState('');
    const [nativeNames, setNativeNames] = useState<string[]>([]);
    const [population, setPopulation] = useState<number>(0);
    const [region, setRegion] = useState<string>('');
    const [subregion, setSubregion] = useState<string>('');
    const [topLevelDomain, setTopLevelDomain] = useState<string>('');
    const [languages, setLanguages] = useState<string[]>(['']);
    const [borders, setBorders] = useState<string[]>(['']);

    useEffect(() => {
        if (isMounted) {
            try {
                setCommonName(data.name.common);
                if(data.name.nativeName != undefined){
                    fetchNativeNames(data, setNativeNames);
                }
                fetchNativeNames(data, setNativeNames);
                setPopulation(data.population);
                setRegion(data.region);
                setSubregion(data.subregion);
                setTopLevelDomain(data.tld);
                setLanguages(Object.keys(data.languages).map((l) => data.languages[l as keyof object]));
                setFlagPng(data.flags.png);
                fetchBorders(data, setBorders);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }
    }, [data]);

    console.log(isLoading);

    if(isLoading){
        return(
            <Loading />
        )
    }

    console.log(borders.length)

    return(
        <StyleWrapper>
            <BackgroundRef />
            <button className={styles.backButton}>
                <img className={styles.backButtonArrow} src={'/right-arrow-svgrepo-com.svg'} />
                Back
            </button>
            <div className={styles.countryInfo}>
                <div className={styles.flagHolder}>
                    <img className={styles.countryFlag} src={flagPng}/>
                </div>
                <div className={styles.countryData}>
                    <h1 className={styles.countryNameDisplay}>{commonName}</h1>
                    <ul className={styles.countrySubInformation}>
                        <li className={styles.bold}>{nativeNames[0] == '' ? '' : `Name in Native Language${nativeNames.length > 1 ? 's: ' : ':'}`}</li>
                        <ul className={styles.nativeNamesList}>{nativeNames.map(n => <li key={n}>{n}</li>)}</ul>
                        <li><span className={styles.bold}>Population: </span>{population}</li>
                        <li><span className={styles.bold}>Region: </span>{region}</li>
                        <li><span className={styles.bold}>Sub Region: </span>{subregion}</li>
                        <li><span className={styles.bold}>Top Level Domain: </span>{topLevelDomain}</li>
                        <ul className={styles.languageHolder}>
                            <li><span className={styles.bold}>Languages: </span>
                                {languages.map(n => `${n}${n != languages[languages.length - 1] ? ', ' : ''}`)}
                            </li>
                        </ul>
                    </ul>
                    <div className={styles.borderHolder}>
                        <h5>{borders.length == 1 ? 'No Bordering Countries' : 'Border Countries: '}</h5>
                        <ul className={styles.borderList}>
                            {borders.length == 1 ? <></> : borders.map(n =>
                                <li key={n}>
                                    <Link href={`/country/${n}`} key={n}>
                                        <button key={n}>{n}</button>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </ StyleWrapper>
    )
}