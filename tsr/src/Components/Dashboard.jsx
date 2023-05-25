import React, { useEffect } from 'react'
import Headline from './Headlinecard'
import '../styles/SelectCategory.css'
import axios from 'axios'
import { useState } from 'react'
import '../styles/dashboard.css'
export default function Dashboard() {
  const [news, setNews] = useState([])
  const [open,setOpen] = useState(true);
  useEffect(()=>{
    startNews()
    
    console.log(news)
    return () => {
        
    }

  },[])
  async function startNews() {
      const response = await axios.get("http://127.0.0.1:8000/homepage").then(res=>{
          return res.data
      }).catch(err=>{console.log(err)})
      setNews(response)
  }
  const submit = async (e) =>{
    const response = await axios.get("http://127.0.0.1:8000/api/app/",{params:{"category":e.target.value}}).then(res=>{
            return res.data
        }).catch(err=>{console.log(err)})
    setNews(response)
  }
  return (
    <div className='dashboard'>
         <main>
        <div onClick={()=>{startNews()}} className='logo'>
            <img  src={require('../logo.png')} alt="logo" className='image'/>
        </div>
        <div className='categories'>
        <button value="Business" onClick={(e)=>{submit(e)}}>Business</button>
        <button value="Entertainment" onClick={(e)=>{submit(e)}}>Entertainment</button>
        <button value="India" onClick={(e)=>{submit(e)}}>India</button>
        <button value="LifeStyle" onClick={(e)=>{submit(e)}}>Lifestyle</button>
        <button value="Politics" onClick={(e)=>{submit(e)}}>Politics</button>
        <button value="ScienceAndTechnology" onClick={(e)=>{submit(e)}}>Science & Technology</button>
        <button value="Sports" onClick={(e)=>{submit(e)}}>Sports</button>
        <button value="World" onClick={(e)=>{submit(e)}}>World</button></div>
    </main>
    <div className='Box-container'>
        {news?.map((article,key) => {
          return(

            
            <Headline key={key} imageURL={article.imageURL} contentURL={article.contentURL} summary={article.summary} headline={article.headline}/>
        )
        }
        )}
    </div>
    </div>
  )
}
