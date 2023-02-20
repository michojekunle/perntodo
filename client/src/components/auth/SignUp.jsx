import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function handleSignUp() {
    try {
      const body = {email, password}
      const res = await fetch('http://localhost:3000/signin', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = res.json();

      if(data.session){
        navigate('/');
      } else {
        alert("Error Creating your Account...");
      }
    } catch (err) {
        console.error(err.message);
    }
  }

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

export default SignUp