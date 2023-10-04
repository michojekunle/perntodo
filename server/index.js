// IMPORTS AND INITIALIZATIONS
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs')
const pool = require('./db');

const whitelist = ['http://localhost:3000', 'https://perntodo-eight.vercel.app']

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

const MAX_AGE = 1000 * 60 * 60 * 3;

// MIDDLEWARES

app.use(session({
    secret: 'secret', 
    resave: true,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: MAX_AGE }
}));


// app.use(cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// ROUTES

// AUTH FOR TODO
//sign Up
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    if(!email || !password){
        res.status(400).json({ msg: "All fields Required!!" });
        console.log("Error All fields required...")
    } else {       
        // Check if User Already Exists
        let found = false;
        const users = (await pool.query("SELECT * FROM users")).rows;
        console.log(users);
        users.forEach(user => {
            if(user?.email === email){
                found = true;
            } 
        })

        if(found){
            res.status(400).json({ msg: "User with the email Already Exists!! Try a new email!!"});
        } else {
            const client = await pool.connect();
            const hash = bcrypt.hashSync(password);
            
            try {
                await client.query('BEGIN')
                const response = await client.query('INSERT INTO login(email, hash) VALUES($1, $2) RETURNING email', [email, hash]);
            
                const newUser = await client.query('INSERT INTO users(email) VALUES ($1) RETURNING *', [response.rows[0].email]);
                req.session.user = newUser.rows[0];
                res.status(201).json({msg: "User Created Succefully", session: newUser.rows[0]});
                await client.query('COMMIT');
            } catch (e) {
                await client.query('ROLLBACK')
                throw e
            } finally {
                client.release()
            }
        }
    }
})

// Sign In
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400).json({ msg: "All Fields Required" });
    } else {
        // Check if user Exists
        let isFound = false;
        const logIn = await pool.query('SELECT * FROM login'); 
        logIn.rows.forEach(async user => {
            if(user.email === email){
                isFound = true;
                const isValid = bcrypt.compareSync(password, user.hash);
                if(isValid){
                    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
                    console.log(user.rows[0]);
                    res.status(200).json({msg: "User Logged In Succefully...", session: user.rows[0]});
                } else {
                    res.status(403).json({ msg: "Error, Invalid Details, User Not Found..." });
                }
            }
        })
        if(!isFound) {
            res.status(403).json({ msg: "Error, Invalid Details, User Not Found..." });
        }
    }
})

app.get('/user/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
    req.session.user = user.rows[0];
    console.log(user.rows);
    res.status(200).json({ msg: "User logged In", session: req.session.user });
})


// log out route 
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        console.log("User Logged Out.");
    })
    res.status(200).json({ msg: "User Logged out", session: {} });
})

// CRUD FOR TODO
//create a todo
app.post('/todos', async (req, res) => {
    try {
        const {description, email} = req.body;
        console.log(description, email);
        const newTodo = await pool.query(
            "INSERT INTO todos (description, email) VALUES($1, $2) RETURNING *", 
            [description, email]
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
        res.status(200).json(allTodos.rows);

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
const PORT = 5002;

app.listen(PORT, () => {
    console.log("App is listening on port", PORT);
})
