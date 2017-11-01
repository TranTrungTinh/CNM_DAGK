const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const Rider = require('./model/Rider');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));
server.listen(4000, () => console.log('Server has been started!'));
io.on('connection' , socket => {
    io.emit('LIST_RIDER' , Rider.getAllRider());
});