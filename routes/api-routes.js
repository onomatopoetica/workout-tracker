const Workout = require("../models/workout-models.js");
const mongoose = require("mongoose");
const router = require("express").Router();


// Route to post form submission to mongoDB via mongoose
router.post("/api/workouts", ({ body }, res) => {
    Workout.create({}).then((dbWorkout) => {
        // If saved successfully, send the the new Workout document to the client
        res.json(dbWorkout);
    }).catch(({ message }) => {
        console.log(message);
    });
});

router.put("/api/workouts/:id", ({ params, body }, res) => {
    console.log("params", body, params);
    // Finding Workout by Id and updating it 
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        { new: true }
    ).then((dbWorkout) => {
        res.json(dbWorkout);
    }).catch((err) => {
        // If an error occurs, send the error to the client
        res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find({})
        .limit(10).then((dbWorkout) => {
            res.json(dbWorkout);
        }).catch((err) => {
            res.json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    Workout.find({}).then((dbWorkout) => {
        res.json(dbWorkout);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;