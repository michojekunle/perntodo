import React from 'react';
import InputTodo from '../InputTodo'
import ListTodos from '../ListTodos'

const Home = () => {
  return (
    <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
  )
}

export default Home