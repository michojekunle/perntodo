import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from "./components/auth/Home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

//components

function App() {
  
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<Home  />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
