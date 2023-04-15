import React, { useEffect, useState } from 'react'
import '../styles/News.css'
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
export default function News() {
  const [isLoading, setIsLoading] = useState(true)
  const [news, setNews] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const location = useLocation()
  const category = location.state.category
  useEffect(()=>{
    (async () =>{
        const response = await axios.get("http://127.0.0.1:8000/getSummary",{params:{"category":category}}).then(res=>{
            return res.data
        }).catch(err=>{console.log(err)})
        setNews(response)
        setIsLoading(false)
    })()
    
    console.log(news)
    return () => {
        
    }

  },[])

const handleLeft = () =>{
    if (currentIndex!==0) {
        let ci = currentIndex - 1;
        setCurrentIndex(ci)
    }
    else{
        let ci = 9
        setCurrentIndex(ci)
    }
}
const handleRight = () =>{
    if(currentIndex!==9) {
        let ci = currentIndex + 1;
        setCurrentIndex(ci)
    }
    else{
        let ci = 0
        setCurrentIndex(ci)
    }
}
  return (
    <div className='main'>
        <Backdrop
        sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <span className='backdrop-text'>Loading curated news</span> <CircularProgress color="inherit" />
      </Backdrop>
        {
            !isLoading?
            <>
            <button className='nav-buttons' onClick={handleLeft}> {`<`} </button>
            <div className='card'>
                <div className='card-image'><img src={news[currentIndex].imageURL} alt="" /></div>
                <div className='card-details'>
                    <div className="card-headline">{news[currentIndex].headline}</div>
                    <div className="card-summary">{news[currentIndex].summary}</div>
                    <div className="card-url"><a href={news[currentIndex].contentURL}>Read Detailed News</a></div>
                </div>
            </div>
            <button className='nav-buttons' onClick={handleRight}> {`>`} </button>
            </>
            :""
        }
      
    </div>
  )
}
