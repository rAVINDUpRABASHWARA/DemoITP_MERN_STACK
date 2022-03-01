//for this js file need to import the Router function in the npm express package
const router = require("express").Router();

//import the student model
let Student = require("../models/Student");

/* Creation of CRUD operations */

//the following line is use to create this ('http://localhost:5000/student/add') url and call it 
/* what happens in behind is that when user call that url mention above 
the stutents.js file will load to the server and choose the applicable operation */
router.route("/add").post((req, res) =>{

    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student({

        name,
        age,
        gender

    })

//save the record to the DB and then and catch to get the response if the CURD is successful or not
    newStudent.save()
    .then(() =>{
        res.json("Student Added");//send a massage to the FE in json format.
    }).catch((err) =>{
        console.log(err);//show the error in console.
    })

})


//the following line is use to create this ('http://localhost:5000/student/') url and call it
router.route("/").get((req, res) =>{

    Student.find().then((students) =>{//assign the student data to students variable.
        res.json(students)//sent data to the FE
    }).catch((err) =>{
        console.log(err);//show the error in console
    })

})


//the following line is use to create this ('http://localhost:5000/student/update/5fgd5j74v5lvm5d73kv543') url and call it
/*In here it uses the async await for the update. This is a special method that use to handle the situations with multiple requests.
In this method async is waiting for a promise, which means if the update gets many update requests without the async await it will crash.
But with async await the first request will continue and if it gets a second request before the first one finish, it will do the both.
So, for the user, no need to wait, the user can move to another request. */
router.route("/update/:id").put(async(req, res) =>{

    //this means the request comes with some parameters.In there, this line will fetch the id parameter and assign to the userId.
    let userId = req.params.id;
    //here uses the d-structure JS.This form can be use in behalf of the normal form
    const {name, age, gender} = req.body;

    //create a seperate object insted of creating a new object
    const updateStudent = {
        name,
        age,
        gender
    }
    /*const update = await Student.findByIdAndUpdate(userId, {name,age,gender}) <= can use this without creating a seperate object. But 
    the following line is better for the readability.*/
    /*In the await, it tells to wait for the second request until the first method finishes its task and the send the promise. */
    const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then(() =>{

        res.status(200).send({status: "User Update"})//successful http status.

    }).catch((err) =>{

        console.log(err);
        //internal server error http status
        res.status(500).send({status: "Ërror with updating user", error: err.message});

    }) 

//the following line is use to create this ('http://localhost:5000/student/delete/5fgd5j74v5lvm5d73kv543') url and call it
    router.route("/delete/:id").delete(async(req,res) =>{

        let userId = req.params.id;
        await Student.findByIdAndDelete(userId)
        .then(() =>{
            res.status(200).send({status: "User deleted"})
        }).catch((err) =>{
            console.log(err);
            res.status(500).send({status: "Error with updating user", error: err.message})
        })

    })
})


//the following line is use to create this ('http://localhost:5000/student/get/5fgd5j74v5lvm5d73kv543') url and call it
router.route("/get/:id").get(async(req, res) =>{
    let userId = req.params.id;

    const user = await Student.findById(userId).then((student) =>{
        res.status(200).send({status: "User Fetched", student})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with get User", error: err.message})
    })
})


module.exports = router;