import React, { useEffect } from 'react'
import Headline from './Headlinecard'
import "../styles/headlines.css";
export default function Headlines({news}) {
  useEffect(()=>{

  },[news])
  return (
    <div className='Box-container'>
        {news?.map((article,key) => {
          return <Headline />
        }

        )}
    </div>
  )
}
