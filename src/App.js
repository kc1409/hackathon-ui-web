import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom';
import slides from "./assets/Data";
import Home from './Components/Home';
import ImageSlider from './Components/ImageSlider';
import Login from './Components/Login';

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/lens' element={<ImageSlider slides={slides} />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App