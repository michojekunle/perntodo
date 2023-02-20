import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function handleSignIn() {
    try {
      const body = {email, password}
      const res = await fetch('http://localhost:3000/signin', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = res.json();

      if(data.session){
        navigate('/')
      } else {
        alert("Error Signing you in...");
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
        <form onSubmit={handleSignIn}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" value={password} className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <small>Don't have an account... <Link to='/signup'>Sign Up</Link></small>
    </div>
  )
}

export default SignIn