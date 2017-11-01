const express = require('express');
const parser = require('body-parser').urlencoded({extended: false});
const request = require('request');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req , res) => res.render('home'));
app.post('/order' , parser , (req , res) => {
    const {phone , lat , lng , bike , other} = req.body;
    if(!phone) res.send({error: error.message});
    console.log(phone , lat , lng , bike , other);
    res.send({message: 'OK'});
})
app.listen(3000, () => console.log('Server has been started!'));