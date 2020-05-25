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
var itemOne = toDo({item: 'train hard'}).save(function(err){
    if (err) throw err;
    console.log('Todo item saved')
});


var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'code'}];


module.exports = function(app){

    app.get('/todo', function(req, res){
        res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser, function(req, res){
        data.push(req.body);
        res.json({todos: data});
    });

    app.delete('/todo/:item', function(req, res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json({todos: data});
    });
};