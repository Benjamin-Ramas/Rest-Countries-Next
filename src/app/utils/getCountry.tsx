/* eslint-disable  @typescript-eslint/no-explicit-any */
export type fetchedCountryData = {
    flag: string;
    flags: {
        png: string,
        alt: string
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

const GetCountries = async(setData: (d: any) => void) => {
    const data = await fetch('/api/getcountries');
    const posts = await data.json();
    const sorted = posts.sort(function(a: fetchedCountryData, b: fetchedCountryData) {
        const textA = a.name.common.toUpperCase();
        const textB = b.name.common.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    return setData(sorted);
}

export const fetchData = async (countryName: string, setData: (d: any) => void, setMounted: (mounted: boolean) => void) => {
    const res = await fetch(`/api/getspecificcountry/${countryName}`);
    const data = await res.json();
    setMounted(true);
    setData(data.posts[0]);
}

export const fetchNativeNames = async (data: fetchedCountryData, setNativeNames: (s: string[]) => void) => {
    const tempNativeNames: (string | undefined)[] = await Promise.all(
        Object.keys(data.name.nativeName).map(async (n) => {
            const res = await fetch(`/api/getlang/${n}`);
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
                const res = await fetch(`/api/getcountrycode/${data.borders[n as keyof object]}`);
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
