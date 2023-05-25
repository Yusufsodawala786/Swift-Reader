import React from 'react'
import '../styles/SelectCategory.css'
import { useNavigate } from 'react-router-dom'
export default function SelectCategory() {
    const navigate = useNavigate()
    const submit = (e) =>{
        const category = e.target.value
        navigate("/main",{
            state:{
                category:category
            }
        });
    }
  return (
    <main>
        <div className='logo'>
            <img src={require('../logo.png')} alt="logo" className='image'/>
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
  )
}
