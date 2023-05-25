import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react';
export default function Update() {
  const [iteration, setIteration] = useState(0)
  const update = async () =>{
    await axios.get("http://127.0.0.1:8000/update");
    console.log(iteration)
    it = iteration++;
    setIteration(it)
  }  
  useEffect(() => {
    const interval = setInterval(update,1000);
    
  
    return () => {
      clearInterval(interval) 
    }
  }, [iteration])
  

  return (
    <div>Update</div>
  )
}
