import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import { Header } from './utils';

function Searched() {
  const location = useLocation();
  const mainData = location.state;
  const [searchingSeq, setSearchingSeq] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e13ceb6565b27a00321702a3c013911a&query=${mainData}`);
      const data = await response.json();
      setSearchingSeq(data.results)
    }
    fetchData();
  }, []);

  console.log('data', searchingSeq);
  return (
    <>
      <Header />
      {searchingSeq.map((data: any) => {
        return (
          <div style={{ display: 'flex', border: '1px solid gray', margin: '1rem 1rem', padding: '1rem 1rem' }}>
            <div>
              <Link to="/media" state={data}>
                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${data.poster_path}`} alt={data.title} style={{ height: '9rem', borderRadius: '12px' }} />
              </Link>
            </div>
            <div style={{ marginLeft: '2rem' }}>
              <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{data.title}</p>
              <p style={{ color: 'gray' }}>{data.release_date}</p>
              <p style={{ color: 'gray' }}>{data.overview}</p>
            </div>
          </div>
        )
      })}
    </>
  );
}

export default Searched