import React, { Fragment, useEffect, useState } from "react";
import { BASE_URL } from '../constant';

import EditTodo from "./EditTodo";

const ListTodos = ({userSession}) => {
  const [todos, setTodos] = useState([]);
  const [userTodos, setUserTodos] = useState([]);

  //delete todo function
  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  

  const getTodos = async () => {
    try {
      const response = await fetch(`${BASE_URL}/todos`);
      let jsonData = await response.json();

      console.log(jsonData);
      setTodos(jsonData.filter(todo => {
        if(todo.email === userSession?.email){
          console.log(todo.email, userSession.email);
          return todo;
        }
      }));      
      
    } catch (err) {
      console.error(err.message);
    }
  };
  
  useEffect(() => {
    getTodos();
    console.log(userTodos);
  }, [userSession]);

  console.log(todos);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {todos.length > 0 ? ( 
            todos.map(todo => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>))
            ) : (
              <tr className="h4 text-center" rowSpan="2" >
                No Todos... Add todos
              </tr>
            )
          }
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
