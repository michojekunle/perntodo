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
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        
        <small>Have an account... <Link to='/signin'>Sign In</Link></small>
    </div>
  )
}

export default SignUp