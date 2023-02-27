import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = ({setUserSession}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function handleSignIn(e) {
    e.preventDefault();
    try {
      const body = {email, password}
      const res = await fetch('http://localhost:5002/signin', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: 'include'
      });
      const data = await res.json();

      console.log("DATA", data);
      if(data.session){
        localStorage.setItem('user_id', data.session.user_id);
        
        navigate('/')
      } else {
        alert("Error Signing you in...");
      }
    } catch (err) {
        console.error(err.message);
    }
  }

  useEffect(() => {
    console.log("Hello World")
  }, []);
  
  return (
    <div className='container'>
        <h1 className='text-center mt-4'>Sign In</h1>
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
        <p className='text-center mt-3'>Don't have an account... <Link to='/signup'>Sign Up</Link></p>
    </div>
  )
}

export default SignIn