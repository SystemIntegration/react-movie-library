import React from 'react'
import { useLocation } from 'react-router-dom'
import { MainResults } from './utils';


function CommonPage() {
  const location = useLocation();
  const mainData = location.state;
  return (
    <>
    <MainResults name={mainData.title !== undefined ? mainData.title : mainData.original_name} />
    </>
  )
}

export default CommonPage