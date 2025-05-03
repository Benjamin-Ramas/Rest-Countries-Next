
import Link from "next/link";
import styles from '@/css/countryCardHolder.module.css'

export type countryCardInfo = {
    flags: {
        alt: string,
        png: string
    },
    name: {common: string, official: string},
    population: number,
    region: string,
    capital: string
};

export default function CountryCard({ info, regionFilter, nameFilter }: {info: countryCardInfo, regionFilter: string, nameFilter: string}){
    if((regionFilter == info.region || regionFilter == 'All') && (info.name.common.toLowerCase().includes(nameFilter.toLowerCase()) || info.name.official.toLowerCase().includes(nameFilter.toLowerCase()) || nameFilter == '')){
        console.log(info.name);
        return(
            <Link href={`/country/${info.name.common}`}>
                <div className={styles.countryCard}>
                    <div className={styles.cardFlagHolder}>
                        <img src={info.flags.png} alt={info.flags.alt} />
                    </div>
                    <h2>{info.name.common}</h2>
                    <h3>Population: {info.population}</h3>
                    <h3>Region: {info.region}</h3>
                    <h3>Capital: {info.capital}</h3>
                </div>
            </Link>
        )
    }
}