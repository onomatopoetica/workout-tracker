const Workout = require("../models/workout-models.js");
const mongoose = require("mongoose");
const router = require("express").Router();

// Route to post form submission to mongoDB via mongoose
router.post("/api/workouts", ({ body }, res) => {
    Workout.create({}).then((dbWorkout) => {
        // If saved successfully, send the the new Workout document to the client
        res.json(dbWorkout);
    }).catch((err) => {
        res.status(500).send('Internal Server Error');
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
        res.status(500).send('Internal Server Error');
    });
});

// Aggregate function to dynamically add up and return duration for each workout
router.get("/api/workouts/range", async function (req, res) {
    try {
        res.json((
            await Workout.aggregate([
                {
                    $addFields: {
                        totalDuration: {
                            $sum: '$exercises.duration',
                        },
                    },
                },
                // Returning the 7 most recent documents (subtracts the oldest document [day] with -1)
            ]).sort({ day: -1 })
                // Limiting number of documents returned in the output to 7
                .limit(7)
            // Shows workouts in order of most recent (right to left)
        ).reverse());
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

router.get("/api/workouts", (req, res) => {
    Workout.find({}).then((dbWorkout) => {
        res.json(dbWorkout);
    }).catch((err) => {
        res.status(500).send('Internal Server Error');
    });
});

module.exports = router;