import React from 'react'
import Trending from './trending';
import TrendingTV from './trendingTV';
import { Header } from './utils';

function Home() {
  return (
    <>
    <Header />
     <Trending />
     <TrendingTV />
    </>
  )
}

export default Home