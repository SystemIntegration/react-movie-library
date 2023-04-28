import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from './logo.png'
import { Autocomplete, Table, TableCell, TableRow, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import ErrorImage from './remove.png'


export const styles: any = {
    logoName: {
        color: 'sandybrown',
        display: 'block',
    },
}

// Method for define style in main screen
export const style: any = {
    tableHead: {
        fontFamily: 'Times New Roman', fontWeight: 'bold',
        borderBottom: 0,
        fontSize: '1.4rem',
        color: 'white',
    },
    tableData: {
        fontFamily: 'Times New Roman', borderBottom: 0,
        fontSize: '1.4rem',
        color:'white'
    },
}

// Method for define strings in main screen
export const string: any = {
    Actors: 'Actors',
    Genre: 'Genre',
    Language: 'Language',
    Director: 'Director',
    Description: 'Description',
    Trailer: 'Trailer',
}

export function Header() {
    const [searchName, setSearchName] = useState("");
    const [searchingSeq, setSearchingSeq] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e13ceb6565b27a00321702a3c013911a&query=${searchName}`);
            const data = await response.json();
            setSearchingSeq(data.results)
            // console.log('data',searchingSeq);
        }
        fetchData();
    }, [searchName]);

    const handleInputChange = (event: any) => {
        setSearchName(event.target.value)
    };

    let newOption = [];
    newOption = searchingSeq.map((data: any) => { return ({ label: data.title }) })


    return (
        <AppBar position="static" style={{ background: '#032541', height: '5.5rem' }}>
            <Container maxWidth="xl" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Toolbar disableGutters>
                    <img src={logo} alt="logo" style={{ marginRight: '1rem' }} />
                    <Typography
                        variant="h4"
                        style={styles.logoName}
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                    >
                        BMV MDb
                    </Typography>
                </Toolbar>
                <Autocomplete
                    loading
                    options={newOption}
                    getOptionLabel={(option) => option.label}
                    clearOnEscape={false}
                    clearOnBlur={false}
                    className="autoComplete"
                    style={{ marginLeft: '1rem' }}
                    renderInput={(params) => (
                        <TextField
                            label="Search.."
                            {...params}
                            value={searchName}
                            onChange={handleInputChange}
                            variant="outlined"
                        >
                        </TextField>
                    )}
                />

            </Container>
        </AppBar>
    );
}

export function MainResults(props: any) {
    interface MovieData {
        Title: string;
        Poster: string,
        Language: string,
        Runtime: string,
        Director: string;
        Plot: string,
        Error: string,
        Actors: string,
        Genre: string,
        Year: string,
        Rated: string,
        imdbVotes: any,
        Ratings: any,
    }

    const [data, setData] = useState<MovieData>({
        Title: "",
        Poster: "",
        Language: "",
        Runtime: "",
        Director: "",
        Plot: "",
        Error: "",
        Actors: "",
        Genre: "",
        Year: "",
        Rated: "",
        imdbVotes: "",
        Ratings: {},
    });

    // Method for get data from searched data
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://www.omdbapi.com/?t=${props.name}&apikey=da47b56d`);
            const data = await response.json();
            setData(data)
            console.log('data', data);
        }
        fetchData();
    }, []);

    // Method for get hours and minutes from total minutes
    function minToHour(num: any) {
        const hours = Math.floor(num / 60);
        const minutes = num % 60;
        return (`${hours} h ${minutes} m`)
    }

    if (!data.Title) {
        if (data.Error) {
            return (
                <div className='subDivForError'>
                    <img className='img' src={ErrorImage} alt="Error" />
                    <h2 className='subDivForError'>{data.Error}</h2>
                </div>
            )
        }
        return (
            <div style={{ height: '100Vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1>Loading ...</h1>
            </div>
        )
    }

    return (
        <>
            <Header />
            <section className="showcase">
                <img className='img' src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${props.image}`} alt="Picture" />
                <div className="overlay">
                    <div className="App">
                        {data.Title ?
                            <div className='mainDiv'>
                                <div className='subDivForDataL'>
                                    <pre style={{ fontSize: '2rem',color:'white' }} >
                                        {data.Title}
                                    </pre>
                                    <pre style={{ fontSize: '1.2rem', color: 'white' }} >
                                        {data.Year} | {data.Rated} | {data.Runtime == "N/A" ? "N/A" : minToHour(data.Runtime.split(" ")[0])}
                                    </pre>
                                    <img src={data.Poster} alt="" />
                                    {data.Ratings.length > 0 && (data.Ratings[0].Value) !== "N/A" &&
                                        <pre style={{ fontSize: '1.6rem', fontWeight: 'bold',color:'white' }} >
                                            &#x2B50; {data.Ratings.length > 0 && (data.Ratings[0].Value).split("/")[0]} &nbsp;
                                            <span>
                                                /{data.Ratings.length > 0 && (data.Ratings[0].Value).split("/")[1]} |&nbsp;
                                                {Math.round(parseInt(data.imdbVotes))}K
                                            </span>
                                        </pre>}
                                </div>
                                <div>
                                    <Table style={{ width: '80%', fontSize: '5rem', marginLeft: '5rem' }}>
                                        <TableRow>
                                            <TableCell style={style.tableHead}>{string.Actors}</TableCell>
                                            <TableCell style={style.tableData}>{data.Actors}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={style.tableHead}>{string.Genre}</TableCell>
                                            <TableCell style={style.tableData}>{data.Genre}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={style.tableHead}>{string.Language}</TableCell>
                                            <TableCell style={style.tableData}>{data.Language}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={style.tableHead}>{string.Director}</TableCell>
                                            <TableCell style={style.tableData}>{data.Director}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={style.tableHead}>{string.Description}</TableCell>
                                            <TableCell style={style.tableData}>{data.Plot}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={style.tableHead}>{string.Trailer}</TableCell>
                                            <TableCell style={style.tableData}>
                                                <a href={`https://www.youtube.com/results?search_query=${data.Title}+trailer`} target='_blank' style={{ textDecoration: 'none', color: 'white' }}>{data.Title}</a>
                                            </TableCell>
                                        </TableRow>
                                    </Table>
                                </div>
                            </div> :
                            <div className='subDivForError'>
                                <img className='img' src={ErrorImage} alt="Error" />
                                <h2 className='subDivForError'>{data.Error}</h2>
                            </div>
                        }
                    </div>
                </div>
            </section>

        </>
    );
}