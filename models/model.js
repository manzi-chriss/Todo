const mongoose = require('mongoose');

const todoSchema= new mongoose.Schema({
    title:{
        type: String,
        required:[ true, 'insert title']
    },

    description:{
        type: String,
        required:[ true, 'insert description']
    },

  
},{
    timestamps : true
})



const Todo = mongoose.model('Todo', todoSchema);


module.exports= Todo;