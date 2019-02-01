
const express = require('express')
const {Client} = require('pg')
const app = express()
// const form = require('./form.html')
const path = require('path')
const router = express.Router()



router.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname + '/home.html'));
});


router.get('/sign-up', (req, res)=> {
  res.sendFile(path.join(__dirname + '/form.html'));
});





app.use(express.static(__dirname + '/Views'));
app.use('/', router)


const PORT = 8080
app.listen(PORT, ()=> {
	console.log('Listeting on port: ', PORT)
})

