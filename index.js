
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



                                      //USER ROUTES
//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------
//Get All Users
      router.get('/users', (req, res)=> {

          // SQL Query > Select Data
          client.query('SELECT * FROM users ORDER BY user_id ASC;')
           .then(result => res.send(result.rows))
           .catch(error => console.log(error))
      });


      //Get users by Username
      router.get('/users/:id', (req, res)=> {

        const id = req.params.id
          // SQL Query > Select Data
          client.query('SELECT * FROM users WHERE username=$1', [id])
           .then(result => res.send(result.rows))
           .catch(error => console.log(error))
      });


      //Get All Cities
      router.get('/users/city', (req, res)=> {

          // SQL Query > Select Data
          client.query('SELECT city FROM users ORDER BY state')
           .then(result => res.send(result.rows))
           .catch(error => console.log(error))
      });


      //Get items by City
      router.get('/users/city/:id', (req, res)=> {

        const id = req.params.id
          // SQL Query > Select Data
          client.query('SELECT * FROM users WHERE city=$1 ORDER BY user_id', [id])
           .then(result => res.send(result.rows))
           .catch(error => console.log(error))
      });


      //Create User
      router.put('/users/new', (req, res, next)=> {

      const text = 'INSERT INTO users(user_id, username, email, city, state, password) VALUES ($1, $2, $3, $4, $5, $6)'
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


      //Upate User
      router.post('/users/update', (req, res, next)=> {

      const text = 'UPDATE users SET username=($2), email=($3), city=($4), state=($5), password=($6) WHERE user_id=($1)'
      let data = [req.body.user_id, req.body.username, req.body.email, req.body.city, req.body.country, req.body.password]
        
      // If insertion is succesfull log message:
        client.query(text, data)
            .then( ()=> {
              res.status(200)
              .json({
                status: 'Success',
                message: 'Updated User'
              })
              .catch(error => console.log(error));
              console.log("User: >" + req.body.username + "< succesfully Updated!")
          })
      });


      // Delete User with Url:
      router.delete('/users/delete/:id', (req, res)=>{

        const id = req.params.id

        client.query('DELETE FROM users WHERE username=($1)', [id])
          .then(result => res.send(result.rows))
          .catch(error => console.log(error))

      })
      // //Delete User with curl
      // router.delete('/delete', (req, res, next)=>{

      //   const text = 'DELETE FROM users WHERE username=($1), password=($2)'
      //   let data = [req.body.username, req.body.password]

      //   client.query(text, data)
      //     .then(()=>{
      //       res.status(200)
      //       .json({
      //         status: 'Succes',
      //         message: 'Deleted User'
      //       })
      //       .catch(error => console.log(error));
      //       console.log("User: >" + req.body.username + "< succesfully Deleted!")
      //     })
      // });

//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------

                                      //ITEM ROUTES
//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------
      //Get All Items
      router.get('/items', (req, res)=> {

          // SQL Query > Select Data
          client.query('SELECT * FROM items ORDER BY user_id ASC;')
           .then(result => res.send(result.rows))
           .catch(error => console.log(error))
      });


      //Get items by Username
      router.get('/items/:id', (req, res)=> {

        const id = req.params.id
          // SQL Query > Select Data
          client.query('SELECT * FROM items WHERE user_id=$1', [id])
           .then(result => res.send(result.rows))
           .catch(error => console.log(error))
      });


      //Get items by Price Range
      router.get('/items/price/:id', (req, res)=> {

        const id = req.params.id
          // SQL Query > Select Data
          client.query('SELECT * FROM items WHERE price=$1 ORDER BY user_id', [id])
           .then(result => res.send(result.rows))
           .catch(error => console.log(error))
      });


      //Create Item
      router.put('/items/new', (req, res, next)=> {

      const text = 'INSERT INTO items(user_id, item_name, publish_date, price) VALUES ($1, $2, $3, $4)'
      let data = [req.body.user_id, req.body.item_name, req.body.publish_date, req.body.price]
        
      // If insertion is succesfull log message:
        client.query(text, data)
            .then( ()=> {
              res.status(200)
              .json({
                status: 'Success',
                message: 'Inserted new Item'
              });
              console.log("New item: >" + req.body.item_name + "< succesfully inserted!")
          })
      });


      //Upate Item
      router.post('/items/update', (req, res, next)=> {

      const text = 'UPDATE items SET item_name=($2), publish_date=($3), price=($4) WHERE user_id=($1)'
      let data = [req.body.user_id, req.body.username, req.body.email, req.body.city, req.body.country, req.body.password]
        
      // If insertion is succesfull log message:
        client.query(text, data)
            .then( ()=> {
              res.status(200)
              .json({
                status: 'Success',
                message: 'Updated Item'
              })
              .catch(error => console.log(error));
              console.log("Item: >" + req.body.item_name + "< succesfully Updated!")
          })
      });


      // Delete item with Url:
      router.delete('/items/delete/:id', (req, res)=>{

        const id = req.params.id

        client.query('DELETE FROM items WHERE item_name=($1)', [id])
          .then(result => res.send(result.rows))
          .catch(error => console.log(error))
        })


//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------





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

