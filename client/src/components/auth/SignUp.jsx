import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';

const SignUp = ({setUserSession}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function handleSignUp(e) {
    e.preventDefault();
    try {
      const body = {email, password}
      const res = await fetch('http://localhost:5002/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: 'include'
      });
      const data = await res.json();
      console.log(data);

      if(data.session){
        localStorage.setItem('user_id', data.session.user_id);
        navigate('/');
      } else {
        alert("Error Creating your Account...");
        alert(data.msg);
        console.log(data);
      }
    } catch (err) {
        console.error(err.message);
    }
  }

  return (
    <div className='container'>
        <h1 className='text-center mt-4'>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" value={password} className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        <p className='text-center'>Have an account... <Link to='/signin'>Sign In</Link></p>
    </div>
  )
}

export default SignUp