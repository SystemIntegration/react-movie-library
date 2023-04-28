import { useEffect, useState } from 'react';
import movieBG from './movieBG.jpg'
import { Autocomplete, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
    const [searchName, setSearchName] = useState("");
    const [searchingSeq, setSearchingSeq] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e13ceb6565b27a00321702a3c013911a&query=${searchName}`);
            const data = await response.json();
            setSearchingSeq(data.results)
            console.log('data', searchingSeq);
        }
        fetchData();
    }, [searchName]);

    const handleInputChange = (event: any) => {
        setSearchName(event.target.value)
    };

    const handleOptionChange = (value: any) => {
        setSearchName(value)
    };

    let newOption = [];
    newOption = searchingSeq.map((data: any) => { return ({ label: data.title }) })

    return (
        <section className="searchBar">
            <img src={movieBG} alt="Picture" />
            <div className="overlay" style={{textAlign:'center'}}>
                <h2>Welcome to BMV movie Database</h2>
                <Autocomplete
                    loading
                    options={newOption}
                    getOptionLabel={(option) => option.label}
                    clearOnEscape={false}
                    clearOnBlur={false}
                    className="autoComplete"
                    onChange={handleOptionChange}
                    style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    renderInput={(params) => (
                        <>
                            <SearchIcon />
                            <TextField
                                label="Search for a movie, tv show....."
                                {...params}
                                value={searchName}
                                onChange={handleInputChange}
                                variant="standard"
                                style={{ marginLeft: '1rem' }}
                            >
                            </TextField>
                        </>
                    )}
                />
            </div>
        </section>
    )
}

export default SearchBar