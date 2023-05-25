import { useState } from 'react';
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Dashboard from './Components/Dashboard';
import News from './Components/News';
function App() {
  
  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
