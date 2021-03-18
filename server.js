const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const router = require("./routes/api-routes.js");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout2',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

// routes
app.use(morgan("dev"));
// app.use("./routes/api");
// app.use("./models/index");
// app.use("./public/exercise");
// app.use("./public/stats");
// app.use("./public/workout");
app.use(router);
require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

// module.exports = db;