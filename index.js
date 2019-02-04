
// Requirements
const express = require('express')
const { Client } = require('pg')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())  

//==> SET UP THE PG MODULE <==
const connectionString = 
'postgresql://jamal:@localhost:5432/marketplace'

//instanciare. te the client and pass it the connection string
const client = new Client({ connectionString })
client.connect().then(()=> {console.log("Connection to Postgres succesfull!")})



const text = 'INSERT INTO users(user_id, first_name, last_name, email, city, country, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
const values = [17, 'yes', 'no', 'diezysiete@hotmail.com', 'ATX', 'USA', '123456789'] 

// callback
client.query(text, values, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  }
})

// promise
client.query(text, values)
  .then(res => {
    console.log(res.rows[0])
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  })
  .catch(e => console.error(e.stack))

// async/await
try {
  const res = pool.query(text, values)
  console.log(res.rows[0])
} catch(err) {
  console.log(err.stack)
}





// //Create User
// router.post('/new', (request, response, next) => {
//   // res.send(req.body)
// // Grab data from http request
//   const data = {text: request.body, complete: false};
//   	console.log(data) 
  
    
// // SQL Query > Insert Data
//     client.query('INSERT INTO users(user_id, first_name, last_name, email, city, country, password) VALUES ($1, $2, $3, $4, $5, $6, $7)',
//      [data.text, data.complete])    
//     .then(result => response.send(data.text)
//     .catch(error => console.log(error)))
// })  
    // SQL Query > Select Data
    // const query = client.query('SELECT * FROM users ORDER BY id ASC');
    
  //   // Stream results back one row at a time
  //   query.on('row', (row) => {
  //     console.log('query on row :::::::')
  //     results.push(row);
  //   });
    
  //   // After all data is returned, close connection and return results
  //   query.on('end', () => {
  //     done();
  //     return res.json(results);
  // });
// });

// Terminal code to Create User:
// curl --data "user_id=17&first_name=nono&last_name=yesyes&email=maildiezysietehotmail&city=CDMX&country=UnitedStates&password=123456789" localhost:8080/new -v




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

