import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  
  async function validateUser() {
    try {
      const res = await fetch('http://localhost:5000/validateUser')
      const data = await res.json();
      console.log(data);
      if(data.session){
        navigate('/');
      }
    } catch (err) {
        console.error(err.message);     
    }
  }

  useEffect(() => {
    validateUser();
  }, []);
  return (
    <div>
        
        <small>Don't have an account... <Link to='/signup'>Sign Up</Link></small>
    </div>
  )
}

export default SignIn