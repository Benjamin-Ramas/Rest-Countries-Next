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

export default GetCountries;
