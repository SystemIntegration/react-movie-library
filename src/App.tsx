import { Table, TableCell, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import "./App.css"
import image from "./bg.png"
import ErrorImage from "./remove.png"
import { string, style } from './utils';

function App() {
  const [search, setSearch] = useState("")

  // Method for set search text from input field
  const handleSearch = (value: any) => {
    setSearch(value)
  }

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
      const response = await fetch(`http://www.omdbapi.com/?t=${search}&apikey=da47b56d`);
      const data = await response.json();
      setData(data)
      // console.log('data', data);
    }
    fetchData();
  }, [search]);

  // Method for get hours and minutes from total minutes
  function minToHour(num: any) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return (`${hours} h ${minutes} m`)
  }

  return (
    <div className="App">
      <br />
      <div className='input' style={{ textAlign: 'center' }}>
        <input type="search" placeholder='Search Movie...' className="inputTagCSS" style={{ cursor: 'pointer', margin: '3.5rem 0' }} value={search.toUpperCase()} onChange={(e) => handleSearch(e.target.value)} />
      </div>
      <br />
      {
        search.length > 0 ? (data.Title ?
          <div className='mainDiv'>
            <div className='subDivForDataL'>
              <pre style={{ fontSize: '2rem' }} >
                {data.Title}
              </pre>
              <pre style={{ fontSize: '1.2rem', color: 'gray' }} >
                {data.Year} | {data.Rated} | {data.Runtime == "N/A" ? "N/A" : minToHour(data.Runtime.split(" ")[0])}
              </pre>
              <img className='img' src={data.Poster} alt="" />
              {data.Ratings.length > 0 && (data.Ratings[0].Value) !== "N/A" &&
                <pre style={{ fontSize: '1.6rem', fontWeight: 'bold' }} >
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
                    <a href={`https://www.youtube.com/results?search_query=${data.Title}+trailer`} target='_blank' style={{ textDecoration: 'none' }}>{data.Title}</a>
                  </TableCell>
                </TableRow>
              </Table>
            </div>
          </div> :
          <div className='subDivForError'>
            <img className='img' src={ErrorImage} alt="Error" />
            <h2 className='subDivForError'>{data.Error}</h2>
          </div>
        ) :
          <div className='subDivForError'>
            <img className='img' src={image} alt="" />
            <h2 >To search for a movie, please enter its name in the search field.</h2>
          </div>
      }
    </div>
  );
}

export default App;
