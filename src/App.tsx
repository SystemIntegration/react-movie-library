import { Table, TableCell, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import "./App.css"
import image from "./bg.png"


function App() {
  const [search, setSearch] = useState("")

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
    imdbVotes: "",
    Year: "",
    Poster: "",
    Language: "",
    Runtime: "",
    Director: "",
    Plot: "",
    Actors: "",
    Genre: "",
    Error: "",
    Rated: "",
    Ratings: {},
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://www.omdbapi.com/?t=${search}&apikey=da47b56d`);
      const data = await response.json();
      setData(data)
      // console.log('data', data);
    }
    fetchData();
  }, [search]);

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
          <div style={{ display: 'flex', justifyContent: 'space-around', margin: '0 3rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <pre style={{ fontFamily: 'Times New Roman', borderBottom: 0, fontSize: '2rem', margin: "0.5rem 0" }} >
                {data.Title}
              </pre>
              <pre style={{ fontFamily: 'Times New Roman', borderBottom: 0, fontSize: '1.2rem', margin: "0.5rem 0", color: 'gray' }} >
                {data.Year} | {data.Rated} | {data.Runtime == "N/A" ? "N/A" : minToHour(data.Runtime.split(" ")[0])}
              </pre>
              <img src={data.Poster} alt="" style={{ textAlign: 'center', margin: '0.5rem 0', borderRadius: '12px', height: '25rem', width: '20rem' }} />
              {data.Ratings.length > 0 && (data.Ratings[0].Value) !== "N/A" &&
                <pre style={{ fontFamily: 'Times New Roman', borderBottom: 0, fontSize: '1.6rem', margin: "0.5rem 0", fontWeight: 'bold' }} >
                  &#x2B50; {data.Ratings.length > 0 && (data.Ratings[0].Value).split("/")[0]} &nbsp;
                  <span style={{ fontFamily: 'Times New Roman', borderBottom: 0, fontSize: '1.4rem', margin: "0.5rem 0", fontWeight: '1', color: 'gray' }} >
                    /{data.Ratings.length > 0 && (data.Ratings[0].Value).split("/")[1]} |&nbsp;
                    {Math.round(parseInt(data.imdbVotes))}K
                  </span>
                </pre>}
            </div>
            <div>
              <Table style={{ width: '80%', fontSize: '5rem', marginLeft: '5rem' }}>
                <TableRow>
                  <TableCell style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', borderBottom: 0, fontSize: '1.4rem', color: 'gray' }} >
                    Actors
                  </TableCell>
                  <TableCell style={{ fontFamily: 'Times New Roman', borderBottom: 0, fontSize: '1.4rem' }} >
                    {data.Actors}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', borderBottom: 0, fontSize: '1.4rem', color: 'gray' }} >
                    Genre
                  </TableCell>
                  <TableCell style={{ fontFamily: 'Times New Roman', borderBottom: 0, fontSize: '1.4rem' }} >
                    {data.Genre}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', borderBottom: 0, fontSize: '1.4rem', color: 'gray' }} >
                    Language
                  </TableCell>
                  <TableCell style={{ fontFamily: 'Times New Roman', borderBottom: 0, fontSize: '1.4rem' }} >
                    {data.Language}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', borderBottom: 0, fontSize: '1.4rem', color: 'gray' }} >
                    Director
                  </TableCell>
                  <TableCell style={{ fontFamily: 'Times New Roman', borderBottom: 0, fontSize: '1.4rem' }} >
                    {data.Director}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', borderBottom: 0, fontSize: '1.4rem', color: 'gray' }} >
                    Description
                  </TableCell>
                  <TableCell style={{ fontFamily: 'Times New Roman', borderBottom: 0, fontSize: '1.4rem' }} >
                    {data.Plot}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', borderBottom: 0, fontSize: '1.4rem', color: 'gray' }} >
                    Trailer
                  </TableCell>
                  <TableCell style={{ fontFamily: 'Times New Roman', borderBottom: 0, fontSize: '1.4rem' }} >
                    <a href={`https://www.youtube.com/results?search_query=${data.Title}+trailer`} target='_blank' style={{ textDecoration: 'none' }}>{data.Title}</a>
                  </TableCell>
                </TableRow>
              </Table>
            </div>
          </div> : <h2 style={{ textAlign: 'center' }}>{data.Error}</h2>) :
          <div style={{ textAlign: 'center' }}>
          <img src={image} alt="" style={{ textAlign: 'center', margin: '0.5rem 0', borderRadius: '12px', height: '25rem', width: '20rem' }} />
          <h2 >To search for a movie, please enter its name in the search field.</h2>
          </div>
      }
    </div>
  );
}

export default App;
