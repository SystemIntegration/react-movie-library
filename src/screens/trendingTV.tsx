import { useEffect, useState } from 'react';
import {FormControlLabel, Switch } from '@mui/material';
import { Link } from 'react-router-dom';

function TrendingTV() {
    const [value, setValue] = useState(false)
    interface movieData { }
    const [data, setData] = useState<movieData[]>([]);

    // Method for get data from searched data
    useEffect(() => {
      async function fetchData() {
        const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=e13ceb6565b27a00321702a3c013911a&language=${value == true ? 'hi' : 'en-US'}&page=1`);
        const data = await response.json();
        setData(data.results)
        console.log('Datas', data);
      }
      fetchData();
    }, [value]);

    //method for get value for change Hindi -> English or English -> Hindi
    const getValue = () => {
      if (value === false) {
        setValue(true)
      } else {
        setValue(false)
      }
    }
    return (
      <div style={{ margin: '1rem 1.5rem' }}>
        <div className='header'>
          <h2>Trending TV Shows
            <FormControlLabel style={{ marginLeft: '2rem' }}
              control={
                <Switch defaultChecked color="secondary" onClick={() => { getValue() }} />
              }
              label={value === true ? "Hindi" : "English"}
            />
          </h2>
        </div>
        <div className='Scroll' style={{ display: 'flex', overflowX: 'auto' }}>
          {
            data.map((data: any) => {
              return (
                <div style={{ marginRight: '1rem' }}>
                <div>
                <Link to="/media" state={data}>
                    <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${data.poster_path}`} alt="" style={{ width: '10rem', height: '12rem', borderRadius: '10px' }} />
                </Link>
                </div>
                  <div>{data.name}</div>
                  <p style={{ color: 'gray' }}>{data.first_air_date}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    )
}

export default TrendingTV