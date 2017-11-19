// import library
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// import my function
const db = require('./model/fbConfig');

// set default
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

// route
app.get('/', (req, res) => res.render('home'));
server.listen(5000, () => console.log('Server has been started port 5000!'));

// socket io
io.on('connection' , socket => {
  db().ref('users').on('child_added', user => {
    // console.log(user.key , user.val());
    const rider = {id: user.key , ...user.val()};
    socket.emit('SEND_LIST_USERS' , rider);
    // console.log(rider)
  });
  db().ref('users').on('child_changed', user => {
    const rider = {id: user.key , ...user.val()};
    socket.emit('SEND_LIST_USERS' , rider);
  });
});