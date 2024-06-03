const express = require("express");
const { connection } = require("./db.js")
require("dotenv").config()
const cors = require('cors')
const { userRouter } = require("./routes/user.routes.js");
const {adminRouter} = require("./routes/admin.routes.js")
const { cameraRouter } = require("./routes/camera_drone.routes.js");
const {imageRouter} = require("./routes/image.routes.js")
const app = express();
app.use(express.json());


// Enable CORS for all routes
app.use(cors());
app.use("/users", userRouter)
app.use("/camera_drones", cameraRouter)
app.use("/admin", adminRouter)
app.use('/api/images', imageRouter);
app.get("/", (req, res) => {
    res.status(200).json({ msg: "hello" })
})
const PORT = process.env.PORT || 8080;
const LOCAL_IP = "192.168.93.120"

app.listen(PORT, LOCAL_IP, async () => {
    try {
        console.log(`server is live at port :-${PORT}`)
        await connection;
        console.log("connected to mongoDB")
    } catch (error) {
        console.log(`somthing went wrong with mongo connection -------------------------------------${error}`)
    }
})