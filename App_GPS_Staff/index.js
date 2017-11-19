// import package
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// import my function
// const drivers = require('./model/Driver');
const db = require('./model/fbConfig');

// settup static
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

// router
app.get('/', (req, res) => res.render('home'));
server.listen(4000, () => console.log('Server has been started port 4000!'));

// socket.io
io.on('connection' , socket => {
    
    // gui danh sach xe    
    db().ref('cars').once('value')
    .then(cars => {
        const arrDrivers = [];
        cars.forEach( e => { 
            const {state} = e.val();
            if(state) return;
            arrDrivers.push({ id: e.key , ...e.val()}); 
        });
        socket.emit('LIST_DRIVER' , arrDrivers);
        // console.log(arrDrivers);
    })
    .catch(err => console.log(err.message));
    

    // realtime child_added
    db().ref('users').on('child_added' , user => {
        // console.log(user.key , user.val());
        const {state} = user.val();
        if(!state) return 0;
        const rider = {key: user.key, ...user.val()};
        socket.emit('NEW_RIDER', rider); 
    });

    // selected driver
    socket.on('CLIENT_SELECTED_DRIVER', driverdata => {
        // console.log(driver);
        const {userKey, driver} = driverdata;
        db().ref(`users/${userKey}`).update({ driver, state: "" });
        db().ref(`cars/${driver.id}`).update({state: true});

        // send busy driver
        const busyDriver = {driverKey: driver.id, riderKey: userKey}
        socket.broadcast.emit('DRIVER_BUSY', busyDriver);
        
    });

    // when cars update state === false
    db().ref('cars').on('child_changed' , car => {
        const {state} = car.val();
        // console.log(state);
        if(!state){
            const driver = {id: car.key, ...car.val()};
            // console.log(driver);
            io.emit('UPDATE_CAR' , driver);
        }
    });
});