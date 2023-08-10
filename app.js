const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3000;
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:231020031Huy@cluster0.drehtbo.mongodb.net/todoListDB');
const workSchema = new mongoose.Schema({content:String});
const Work = new mongoose.model('Work',workSchema);
const work = new Work({content:"Welcome to to do list"});
const work2 = new Work({content:"Welcome to to do list"});
const work3 = new Work({content:"Welcome to to do list"});
const defaultWork = [work,work2,work3];
const listSchema = new mongoose.Schema({name: String, works: [workSchema]});
const List = new mongoose.model('List',listSchema);
const list = new List()

app.use(express.static('public'));
app.get('/', (req,res)=>{
    res.redirect("/home");
});
app.get('/:name',(req,res)=>{
    const userName = req.params.name;
    List.findOne({name: userName}).then((result)=>{
        if(!result){
            const list = new List({name: userName,works: defaultWork});
            list.save().then((result1)=>{
                res.render('index.ejs',{content:result1});
            })
        }else{
            res.render('index.ejs',{content:result});
        }
            
        
        
    }).catch((error)=>{
        console.log(error);
    });

   
})
app.post('/post',(req,res)=>{
    List.findOneAndUpdate(
        { name: req.body.name },
        { $push: { works: new Work({ content: req.body.content }) } },
        { new: true }
    )
    .then((updatedResult) => {
        console.log("Updated:", updatedResult);
        res.redirect(`/${req.body.name}`);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send("An error occurred.");
    });
    
    
    
})
app.post('/delete',(req,res)=>{

    List.findOneAndUpdate(
        {name:req.body.user},
        {$pull:{works:{_id:req.body.checkbox}}},
        {new:true}
        ).then((updatedResult) => {
            console.log(updatedResult);
            res.redirect(`/${req.body.user}`);
        }).catch((error) => {
            console.log(error);
        })
})
app.listen(PORT,()=>{console.log('listening on port '+PORT);});