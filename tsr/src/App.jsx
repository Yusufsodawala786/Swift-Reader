import { useState } from 'react';
import { BrowserRouter,Routes,Route } from "react-router-dom"
import axios from 'axios';
import SelectCategory from './Components/SelectCategory';
import News from './Components/News';
function App() {

  const [news, setNews] = useState([])
  
  

  async function getData(category) {
    let data;
      await axios.get('http://127.0.0.1:8000/getSummary',{params:{"category":category}})
      .then(res => {
        data = res.data
        setNews(data)
        console.log(data)
      })
      .catch(err=>{})
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SelectCategory/>}/>
          <Route path='/main' element={<News/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
