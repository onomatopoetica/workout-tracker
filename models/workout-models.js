const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// New workout schema
const WorkoutSchema = new Schema({
    // Creates the day attribute
    day: { type: Date, default: () => new Date() },
    // Creating exercises
    exercises: [
        {
            // Setting name, type, duration, weight, reps, sets + distance attributes
            name: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            duration: {
                type: Number,
                required: true
            },
            weight: {
                type: Number,
                required: true
            },
            reps: {
                type: Number,
                required: true
            },
            sets: {
                type: Number,
                required: true
            },
            distance: {
                type: Number,
                required: true
            },
        },
    ],

},
    {
        toJSON: {
            // Virtual attributes are attributes do not get persisted to mongodb. For the virtual attribute to be displayed on client side, then set {virtuals: true} for toJSON in schemas
            virtuals: true,
        },
    }
);
// Getting total duration for each workout
WorkoutSchema.virtual("totalDuration").get(function () {
    // The reduce() method executes a reducer function on each element of an array resulting in single output value
    const duration = this.exercises.reduce((acc, curr) => {
        return acc + curr.duration;
        // Initial value of 0
    }, 0);
    return duration;
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;

