import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from "./components/auth/Home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

//components

function App() {
  
  return (
      <Routes>
        <Route path='/' element={<Home  />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
  );
}

export default App;
