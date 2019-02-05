
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


//Create User
router.post('/new', (req, res, next)=> {

const text = 'INSERT INTO users(user_id, username, email, city, country, password) VALUES ($1, $2, $3, $4, $5, $6)'
const body = req.body
let data = [req.body.user_id, req.body.username, req.body.email, req.body.city, req.body.country, req.body.password]
  

// If insertion is succesfull log message:
  client.query(text, data)
      .then( ()=> {
        res.status(200)
        .json({
          status: 'success',
          message: 'Inserted new User'
        });
        console.log("new user inserted")
    })
   
// Terminal syntax to insert new user:
// curl --data "user_id=17&username=yesyes&email=maildiezysietehotmail&city=CDMX&country=UnitedStates&password=123456789" \localhost:8080/new -v
});



//Get home page
router.get('/home', (req, res)=> {
  res.sendFile(path.join(__dirname + '/home.html'));
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

