const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/todoListDB');
const workSchema = new mongoose.Schema({content:String});
const Work = new mongoose.model('Work',workSchema);
