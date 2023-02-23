import React, { useEffect, useState } from 'react';
import InputTodo from '../InputTodo'
import ListTodos from '../ListTodos'
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';

const Home = () => {
  const [ userSession, setuserSession ] = useState({});
  const navigate = useNavigate();
  let session = {};

  useEffect(() => {

    const user_id = localStorage.getItem("user_id");
    console.log(user_id);
    if (user_id !== 'null' && user_id !== null ) {
      fetch(`http://localhost:5000/user/${user_id}`)
      .then(res => res.json())
      .then(data => {
       console.log(data);
       if(data.session){
        setuserSession(data.session);
      }
    })
  } else {
    alert("User Not Authenticated...")
    navigate('/signin');
  }
}, [localStorage.getItem("user_id")]);

  console.log(userSession);
  console.log(userSession);
  console.log(userSession);

  return (
    <div className="container">
        <Logout/>
        <InputTodo userSession={userSession}/>
        <ListTodos userSession={userSession}/>
      </div>
  )
}

export default Home