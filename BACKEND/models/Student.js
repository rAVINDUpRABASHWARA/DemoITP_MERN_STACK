//To connect the database use the mongoose and following lin use to import the mongoose
const mongoose = require('mongoose');

//In mongodb there is something call schema, so there is a method in mongoose and assign that method to a constant variable
const Schema = mongoose.Schema;

//same as creating a class in java
const studentSchema = new Schema({

    name : {
        type : String,
        required: true
    },
    age : {
        type : Number,
        required: true
    },
    gender : {
        type: String,
        required: true
    }

})

//data is add to the routes and that data will send to the DB through modles.
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;