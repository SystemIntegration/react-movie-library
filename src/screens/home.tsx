import React from 'react'
import { Header, TrendingPage } from './utils';

function Home() {
  return (
    <>
    <Header />
     <TrendingPage value="movie" />
     <TrendingPage value="tv" />
    </>
  )
}

export default Home