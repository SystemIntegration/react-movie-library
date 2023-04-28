import React from 'react'
import { Header, TrendingPage } from './utils';
import SearchBar from './searchBar';

function Home() {
  return (
    <>
      <Header />
      <SearchBar />
      <TrendingPage value="movie" />
      <TrendingPage value="tv" />
    </>
  )
}

export default Home