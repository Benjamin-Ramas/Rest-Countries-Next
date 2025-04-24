export type fetchedCountryData = {
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

const GetCountries = async() => {
    const data = await fetch('https://restcountries.com/v3.1/all');
    const posts: object = await data.json();
    return (
        <>
            <p>
                {JSON.stringify(posts)}
            </p>
        </>
    )
}

export const fetchData = async (countryName: string, setData: (d: any) => void, setMounted: (mounted: boolean) => void) => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data.type);
            setData(data[0])
            setMounted(true);
          })
}

export const fetchNativeNames = async (data: fetchedCountryData, setNativeNames: (s: string[]) => void) => {
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
        if(filteredNativeNames[0] != undefined){
            setNativeNames([filteredNativeNames[0].split(':')[1]]);
        } else{
            setNativeNames([''])
        }
    }
};

export const fetchBorders = async (data: fetchedCountryData, setBorders: (data: string[]) => void) => {
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

export default GetCountries;
