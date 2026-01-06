const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        status: {
            type: String,
            enum: ['active', 'inactive']
        },
        date: {
            type: Date, 
            default: Date.now()
        },
        user:{
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    }
);

// ******* instance methods ********* 
todoSchema.methods = {
    findActive: function(){
        return mongoose.model("Todo").find({status: 'active'});
    },
}

// *******  statics methods ******* 
todoSchema.statics = {
    findByTitle: function(){
        return this.find({title: /iphone/i}); // new RegExp()
    },
}

// *******  query helper ******* 
todoSchema.query = {
    byStatus: function(status){
        return this.find({status: new RegExp(status, "i")}); // new RegExp()
    },
}

module.exports = todoSchema;