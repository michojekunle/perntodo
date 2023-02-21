import React, { useEffect } from 'react';
import InputTodo from '../InputTodo'
import ListTodos from '../ListTodos'
import { useNavigate } from 'react-router-dom';

const Home = () => {
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

    validateUser();
  }, []);

  return (
    <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
  )
}

export default Home