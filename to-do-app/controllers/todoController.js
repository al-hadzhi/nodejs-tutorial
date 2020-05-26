var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb+srv://test:test@cluster0-ahgzn.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});


// create a schema - this is like a blueprint
var toDoSchema = new mongoose.Schema({
    item: String
});

var toDo = mongoose.model('toDo', toDoSchema);

// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'code'}];

module.exports = function(app){

    app.get('/todo', function(req, res){
        // get data from mongodb and pass it to the view
        toDo.find({}, function(err, data){ // we pass an empty object as a first parameter to "find" all items
            if (err) throw err;
            res.render('todo', {todos: data});
        }); 
    });

    app.post('/todo', urlencodedParser, function(req, res){
        // get data from the view and add it to mognodb
        var newToDo = toDo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        })
    });

    app.delete('/todo/:item', function(req, res){
        // delete the requested item from mongodb
        toDo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });
};