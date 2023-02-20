import React, { useEffect } from "react";
import { useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from "./components/auth/Home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

//components

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    async function validateUser() {
      try {
        const res = await fetch('http://localhost:5000/validateUser')
        const data = await res.json();
        console.log(data);
        if(!data.session){
          navigate('/signin');
        }
      } catch (err) {
          console.error(err.message);     
      }
    }
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
