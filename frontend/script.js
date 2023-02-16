const descriptionEl = document.querySelector('#description');
const tbody = document.querySelector('#tbody');
const form = document.querySelector('#form');

let todos = [];
let description = descriptionEl.value;

descriptionEl.addEventListener('change', e => {
    description = e.target.value;
});



  //edit description function
  const updateDescription = async (description, todo_id) => {
    console.log(document.querySelector(`#modal-input${todo_id}`).value);
    description = document.querySelector(`#modal-input${todo_id}`).value;
    alert(description)
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/frontend/index.html";
    } catch (err) {
      console.error(err.message);
    }
  };


  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/frontend/index.html";
    } catch (err) {
      console.error(err.message);
    }
  };




  //delete todo function

  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });

      const res = await deleteTodo.json();
      console.log(res);

      todos = todos.filter(todo => todo.todo_id !== id);
      refreshTodos(todos);
    } catch (err) {
      console.error(err.message);
    }
  };

const getTodos = async () => {
    try {
        const response = await fetch("http://localhost:5000/todos");
        const jsonData = await response.json();

        todos = await jsonData;
        refreshTodos(todos);
    } catch (err) {
        console.error(err.message);
    }
};

const refreshTodos = (todos) => {
    tbody.innerHTML = `
        ${todos.map(todo => 
            { 
                return (
                    `<tr>
                        <td class='text-left'>${todo.description}</td>
                        <td>
                            <button
                                type="button"
                                class="btn btn-warning"
                                data-toggle="modal"
                                data-target=${`#id${todo.todo_id}`}
                                onClick="updateDesc(${todo.todo_id})"
                            >
                                Edit
                            </button>
                            <div
                                class="modal"
                                id=${`id${todo.todo_id}`}
                            >
                                <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h4 class="modal-title">Edit Todo</h4>
                                    <button
                                        type="button"
                                        class="close"
                                        data-dismiss="modal"
                                    >
                                        &times;
                                    </button>
                                    </div>
                        
                                    <div class="modal-body">
                                    <input
                                        type="text"
                                        class="form-control"
                                        id='modal-input${todo.todo_id}'
                                        onChange="setDescription(e)"
                                    />
                                    </div>
                        
                                    <div class="modal-footer">
                                    <button
                                        type="button"
                                        class="btn btn-warning"
                                        data-dismiss="modal"
                                        onClick="updateDescription('${description}', ${todo.todo_id})"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-danger"
                                        data-dismiss="modal"
                                        id="close-modal"
                                    >
                                        Close
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <button
                                class="btn btn-danger"
                                id="delete"
                                onClick="deleteTodo(${todo.todo_id})"
                            >
                                Delete
                            </button>
                        </td>
                        </tr>`)
        }).join('')}`
}

function updateDesc(id) {
    let desc;
    todos.forEach(todo => {
        if(todo.todo_id === id){
            desc = todo.description;
            document.querySelector(`#modal-input${id}`).value = `${desc}`;
        }
    });
    console.log(todos);
}

getTodos();
console.log(todos);
refreshTodos(todos);

form.addEventListener('submit', onSubmitForm);

function setDescription(e) {
    description = e.target.value;
    alert(description);
}