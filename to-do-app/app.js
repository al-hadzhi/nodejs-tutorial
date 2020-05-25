var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();


// set up template engine - EJS
app.set('view engine', 'ejs');


// static files express and middleware
// by only having one argument we state that this static file is to used by all url-routes. Example: localhost:3000/{url}
app.use(express.static('./public'));


// fire controllers
todoController(app);


// listen to port
app.listen(3000);
console.log('You are listening to port 3000');


