
// Requirements
const express = require('express')
const { Client } = require('pg')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())  

//==> SET UP THE PG MODULE <==
const connectionString = 
'postgresql://jamal:@localhost:5432/marketplace'

// instanciare. te the client and pass it the connection string
const client = new Client({ connectionString })
client.connect().then(()=> {console.log("Connection to Postgres succesfull!")})


//Get All Users
router.get('/users', (req, res)=> {

    // SQL Query > Select Data
    client.query('SELECT * FROM users ORDER BY user_id ASC;')
     .then(result => res.send(result.rows))
     .catch(error => console.log(error))
});


//Get Users by Username
router.get('/users/:id', (req, res)=> {

  const id = req.params.id
    // SQL Query > Select Data
    client.query('SELECT * FROM users WHERE username=$1', [id])
     .then(result => res.send(result.rows))
     .catch(error => console.log(error))
});


//Get All Cities
router.get('/city', (req, res)=> {

    // SQL Query > Select Data
    client.query('SELECT city FROM users ORDER BY state')
     .then(result => res.send(result.rows))
     .catch(error => console.log(error))
});


//Get Users by City
router.get('/city/:id', (req, res)=> {

  const id = req.params.id
    // SQL Query > Select Data
    client.query('SELECT * FROM users WHERE city=$1 ORDER BY user_id', [id])
     .then(result => res.send(result.rows))
     .catch(error => console.log(error))
});


//Create User
router.post('/new', (req, res, next)=> {

const text = 'INSERT INTO users(user_id, username, email, city, country, password) VALUES ($1, $2, $3, $4, $5, $6)'
let data = [req.body.user_id, req.body.username, req.body.email, req.body.city, req.body.country, req.body.password]
  
// If insertion is succesfull log message:
  client.query(text, data)
      .then( ()=> {
        res.status(200)
        .json({
          status: 'Success',
          message: 'Inserted new User'
        });
        console.log("New user: >" + req.body.username + "< succesfully inserted!")
    })
});





//Get create and account page
router.get('/sign-up', (req, res)=> {
  res.sendFile(path.join(__dirname + '/form.html'));
});


//Using Views folder for Css
app.use(express.static(__dirname + '/Views'));
app.use('/', router)


//App listening
const PORT = 8080
app.listen(PORT, ()=> {
	console.log('Listeting on port: ', PORT)
})

