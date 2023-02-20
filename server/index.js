// IMPORTS AND INITIALIZATIONS
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');

const HOUR = 1000 * 60 * 60;

// MIDDLEWARES

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret', 
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: HOUR }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// ROUTES

// AUTH FOR TODO
//sign Up
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    if(!email && !password){
        res.status(400).json({ msg: "All fields Required!!" })
    } else {
        // Check if User Already Exists
        let found = false;
        Users.forEach(user => {
            if(user?.email === email){
                found = true;
            } 
        })
        if(found){
            res.status(400).json({ msg: "User with the email Already Exists!! Try a new email!!"});
        } else {
            let newUser = { email: email, password: password }
            Users.push(newUser);
            req.session.user = newUser;
            res.status(200).json({ msg: "New User Created", session: req.session.user });
        }
    }
})

// Sign In
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if(!email && !password) {
        res.status(400).json({ msg: "All Fields Required" });
    } else {
        // Validate User
        let isFound = false; 
        Users.forEach(user => {
            if(user.email === email && user.password === password){
                isFound = true;
                req.session.user = user;
            }
        })
        if(isFound){
                console.log("User Found");
                res.status(200).json({ msg: "User logged In", session: req.session.user });
                console.log("User Logged In");
        } else {
            res.status(403).json({ msg: "Error, Invalid Details, User Not Found..." });
        }
    }
})


//protected page(home page)
//validateUser
app.get('/validateUser', (req, res) => {
    if(req.session.user){
        res.status(200).json({ msg: "User logged In", session: req.session.user });
    } else {
        res.status(403).json({ msg: "User Not Authorized" });
    }
})

// log out route 
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        console.log("User Logged Out.");
    })
    res.status(200).json({ msg: "Use Logged out" });
})

// CRUD FOR TODO
//create a todo
app.post('/todos', async (req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todos (description) VALUES($1) RETURNING *", 
            [description]
        ) ;
        console.log(newTodo.rows[0]);
        res.status(200).json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// get all todos
app.get('/todos', async (req, res) => {
    
    try {
        const allTodos = await pool.query("SELECT * FROM todos");
        res.status(200).json(allTodos.rows)

    } catch (err) {
        console.error(err.message);
    }
})


//Get a Todo 
app.get('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todos WHERE todo_id = $1", [id]);
        res.status(200).json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// update a todo
app.put('/todos/:id', async (req, res) => {
    try {
       const {id} = req.params;
       const {description} = req.body;
       const updateTodo = await pool.query(
        "UPDATE todos SET description = $1 WHERE todo_id = $2", 
        [description, id]
       );
       res.json("Todo was Updated!");
    } catch (err) {
        console.error(err.message)
    }
})

// delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todos WHERE todo_id = $1", [id]);
        res.status(200).json('todo deleted');
    } catch (err) {
        console.error(err.message);
    }
})

//SERVER
const PORT = 5000;

app.listen(PORT, () => {
    console.log("App is listening on port", PORT);
})