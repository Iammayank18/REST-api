
const express = require('express');
const mongoose = require('mongoose');
require('./db/conn');
const Student = require('./models/Schema');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world');
});


//storing data in database
app.post('/student', (req, res) => {
    const user = new Student(req.body);
    user.save().then(() => {
        res.status(201).send('Student added');
    }).catch((err) => {
        res.send(err);
    });
    res.send(req.body);
});

// Getting data from database
app.get('/student/view', async (req, res) => {
    try {
        const stdata = await Student.find();
        res.status(201).send(stdata);

    } catch (err) {
        res.send(err);
    }
});


// //Getting individual data from database by Id
// app.get('/student/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const stdata = await Student.findById(id);
//         res.status(201).send(stdata);

//     } catch (err) {
//         res.send(err);
//     }
// });



//Getting individual data from database by name
app.get('/student/get/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const stdata = await Student.find({ name });
        res.status(201).send(stdata);
    } catch (err) {
        res.send(err);
    }
});


//Getting data by email
app.get('/student/get/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const email_dat = await Student.find({ email });
        res.send(email_dat);

    } catch (error) {
        res.send(error);
    }
});



//Deleting data from database by name
app.delete('/student/remove/:email', async (req, res) => {

    try {
        const email = req.params.email;
        const deleteDat = await Student.deleteOne({ email });
        if (!deleteDat) {
            res.status(404).send('No data found');
        }
        res.status(200).send(`User Deleted`);

    } catch (e) {
        res.status(500).send(e);
    }

});


//Updating the data from database by email
app.patch('/student/update/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const updateDat = await Student.findOneAndUpdate(email, req.body, { new: true });
        res.send(updateDat);
    } catch (e) {
        res.status(500).send(e);
    }
});



app.listen(3000, () => {
    console.log('Server started at port 3000');
});
