const express = require("express");
const app = express();
const createError = require("http-errors");
const mongoose = require("mongoose");
const { setCors } = require("./middleware/security");
const dot = require("dotenv");
dot.config();
const env = require("./config/config")

const indexRoute = require("./routes/indexRoute");
const archiveRoute = require("./routes/archiveRoute");
const usersRoute = require("./routes/usersRoute");

const port = process.env.PORT || 3000;

mongoose.connect(env.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.on("error", (err) => console.log(err));
mongoose.connection.on("open", () => console.log("db connected"));

app.use(express.json());
app.use(setCors); //middleware to use setCors on all routes

app.use("/", indexRoute);
app.use("/archive", archiveRoute);
app.use("/users", usersRoute);


//Error Handler
app.use((req, res, next) => {
    next(createError(404))
});

app.use((err, req, res, next) => {
    res.json({
        status: err.status,
        err: err.message
    })
})
console.log(port);

app.listen(port, () => console.log(`Server ist am been`));