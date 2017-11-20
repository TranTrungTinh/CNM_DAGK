// import library
const express = require('express');
const parser = require('body-parser').urlencoded({extended: false});
const cookieParser = require('cookie-parser');

//cache data history
const histories = [];

// config data base
const db = require('./model/fbConfig');
const middle = require('./model/middleware');


// using static default
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(cookieParser());

app.get('/', (req , res) => res.render('home'));
app.post('/order' , parser , (req , res) => {
    const {phone , address , lat , lng , bike , other} = req.body;
    const orderHistory = histories.filter(e => e.address == address);
    if(!orderHistory[0]) {
        const {state} = req.body;
        if(!phone) res.send({error: error.message});
        db().ref('users').push({phone , address ,lat ,lng ,bike ,other ,state});
    }else{
        // console.log('cap nhat lai lich su' ,orderHistory[0] );
        const {id} = orderHistory[0];
        //B1: Xoa lich su cu
        db().ref(`history/${id}`).remove();
        //B2: Them user mo
        const { driver , state } = orderHistory[0];
        db().ref('users').push({phone,address,lat,lng,bike,other,state,driver});
        //B3: Update trang thai xe
        db().ref(`cars/${driver.id}`).update({state: true});
    }
    res.send({message: 'OK'});
});
app.post('/history' , parser , (req , res) => {
    const {phone} = req.body;
    const history = histories.filter(e => e.phone == phone);
    if(!history[0]) return res.send({error: "NO"});
    res.send({message: "OK" , history});
});

app.post('/signin' , parser , (req , res) => {
    const {username , password} = req.body;
    middle.signIn(username , password)
    .then(token => {
        res.cookie('token' , token);
        res.send({message: "OK"});
    })
    .catch(err => res.send({error: err.message}));
});
app.get('/renewtoken', middle.isLogin , (req , res) => {
    res.send({message: "SUCCESS"});
});


app.listen(3000, () => console.log('Server has been started port 3000!'));

// listen data update
db().ref('history').on('child_added' , data => {
    const history = {...data.val() , id: data.key};
    histories.push(history);
});
