const express = require("express");
const { connection } = require("./db.js")
require("dotenv").config()
const cors = require('cors')
const { userRouter } = require("./routes/user.routes.js");
const { cameraRouter } = require("./routes/camera_drone.routes.js");
const app = express();
app.use(express.json());


// Enable CORS for all routes
app.use(cors());
app.use("/users", userRouter)
app.use("/camera_drones", cameraRouter)
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
    try {
        console.log(`server is live at port :-${PORT}`)
        await connection;
        console.log("connected to mongoDB")
    } catch (error) {
        console.log(`somthing went wrong with mongo connection -------------------------------------${error}`)
    }
})