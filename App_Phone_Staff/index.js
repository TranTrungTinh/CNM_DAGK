const express = require('express');
const parser = require('body-parser').urlencoded({extended: false});
const app = express();
//cache data history
const histories = [];
// config data base
const db = require('./model/fbConfig');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req , res) => res.render('home'));
app.post('/order' , parser , (req , res) => {
    const {phone ,address ,lat ,lng ,bike ,other ,state} = req.body;
    if(!phone) res.send({error: error.message});
    

    db().ref('users').push({phone ,address ,lat ,lng ,bike ,other ,state});
    res.send({message: 'OK'});
});
app.post('/history' , parser , (req , res) => {
    const {phone} = req.body;
    // console.log(phone);
    const history = histories.filter(e => e.phone == phone);
    if(!history[0]) return res.send({error: "NO"});
    // console.log(history);
    res.send({message: "OK" , history});
});

app.listen(3000, () => console.log('Server has been started!'));

// listen data update
db().ref('history').on('child_added' , data => {
    const history = {id: data.key , ...data.val()};
    histories.push(history);
});
