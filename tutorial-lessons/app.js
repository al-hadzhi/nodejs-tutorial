var express = require('express');

var app = express(); // done so due to the express module.exports function

app.set('view engine', 'ejs'); // setting ejs as our view engine
app.use('/assets', express.static('stuff')); // built-in express function for middleware

app.get('/', function(req, res){
    res.render('index');
});

app.get('/contact', function(req, res){
    console.log(req.query);
    res.render('contact', {qs: req.query});
});

app.get('/profile/:name', function(req, res){
    var data = {age: 29, job: 'plumber', hobbies: ['jumping', 'fishing', 'eating']};
    res.render('profile', {person: req.params.name, data: data}); // we want to render the specific page (profile-file) and pass to it an object: person with the parameter name which is derived from the url -> /:name
});

app.listen(3000); // Listening to port 3000

