'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type countryData = {
    flags: {
        png: string
    }
    name: {
        common: string,
        nativeName: [ {common: string} ]
    },
    population: number,
    region: string,
    subregion: string,
    tld: string,
    languages: [],
    borders: object

}

const defaultCountry: countryData = {
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
    const fetchBorders = async () => {
        if(data.borders != undefined){
            const tempBorders: string[] = await Promise.all(
                Object.keys(data.borders).map(async (n) => {
                    const res = await fetch(`https://restcountries.com/v3.1/alpha/${data.borders[n as keyof object]}`);
                    const d = await res.json();
                    if(d[0] != undefined){
                        return d[0].name.common;
                    }
                })
            );
            setBorders(tempBorders);
        }
    }

    const fetchNativeNames = async () => {
        const tempNativeNames: (string | undefined)[] = await Promise.all(
            Object.keys(data.name.nativeName).map(async (n) => {
                const res = await fetch(`https://restcountries.com/v3.1/lang/${n}`);
                const d = await res.json();
                if(d[0] != undefined){
                    return `${d[0].languages[n]}: ${data.name.nativeName[n as keyof object].common}`;
                }
            })
        );
        const filteredNativeNames: string[] = tempNativeNames.filter((name): name is string => name !== undefined);
    if(filteredNativeNames.length > 1){
        setNativeNames(filteredNativeNames);
    }
    else{
        setNativeNames([filteredNativeNames[0].split(':')[1]]);
    }
    };

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
          .then((res) => res.json())
          .then((data) => {
            setData(data[0])
            setMounted(true);
          })
      }, [])

    const [data, setData] = useState<countryData>(defaultCountry);
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
                    fetchNativeNames();
                }
                fetchNativeNames();
                setPopulation(data.population);
                setRegion(data.region);
                setSubregion(data.subregion);
                setTopLevelDomain(data.tld);
                setLanguages(Object.keys(data.languages).map((l) => data.languages[l as keyof object]));
                setFlagPng(data.flags.png);
                fetchBorders();
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }
    }, [data]);
    if(!isLoading){
    return(
        <>
            <img src={flagPng}/>
            <h1>{commonName}</h1>
            <h3>Name in Native Language{nativeNames.length > 1 ? 's' : ''}: </h3>
            {nativeNames.map(n => <h4 key={n}>{n}</h4>)}
            <h3>Population: {population}</h3>
            <h3>Region: {region}</h3>
            <h3>Sub Region: {subregion}</h3>
            <h3>Top Level Domain: {topLevelDomain}</h3>
            <h3>Languages</h3>
            {languages.map(n => <h4 key={n}>{n}</h4>)}
            <h3>Border Countries</h3>
            {borders.map(n =>
                <Link href={`/country/${n}`} key={n}>
                    <button key={n}>{n}</button>
                </Link>
            )}
        </>
    )}
    else{
        return(<>
        </>)
    }
}