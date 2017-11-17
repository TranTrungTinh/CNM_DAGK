// import package
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// import my function
const Driver = require('./model/Rider');
const db = require('./model/fbConfig');

// settup static
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

// router
app.get('/', (req, res) => res.render('home'));
server.listen(4000, () => console.log('Server has been started!'));

// socket.io
io.on('connection' , socket => {
    io.emit('LIST_RIDER' , Driver.getAllRider());

    // realtime child_added
    db().ref('users').on('child_added' , user => {
        // console.log(user.key , user.val());
        if(!user.val().state) return;
        const rider = {key: user.key, ...user.val()};
        io.emit('NEW_RIDER', rider); 
    });
});