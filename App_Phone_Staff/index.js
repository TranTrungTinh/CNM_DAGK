const express = require('express');
const parser = require('body-parser').urlencoded({extended: false});
const app = express();
// const server = require('http').Server();
// const io = require('socket.io')(server);

// config data base
const db = require('./model/fbConfig');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req , res) => res.render('home'));
app.post('/order' , parser , (req , res) => {
    const {phone ,address ,lat ,lng ,bike ,other ,state} = req.body;
    if(!phone) res.send({error: error.message});
    // console.log(phone , lat , lng , bike , other);
    db().ref('users').push({phone ,address ,lat ,lng ,bike ,other ,state});
    res.send({message: 'OK'});
});
app.listen(3000, () => console.log('Server has been started!'));

// server.listen(3000, () => console.log('Server has been started!'));
// io.on('connection' , socket => {
//     // to do
// });