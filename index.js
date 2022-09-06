const port = 3000
const path = require("path")
const {app, express} = require("./server")

//connection to database
require("./mongo")

//Controllers
const { createUser, logUser } = require("./controllers/users")
const { getSauces, createSauce,  getSaucesById,  deleteSauce,  modifSauce, likeSauce } = require("./controllers/sauces")

//Middleware
const {upload} = require ("./middleware/multer")
const { authenticateUser } = require("./middleware/auth")

//routes
app.post("/api/auth/signup", createUser)
app.post("/api/auth/login", logUser)
app.get("/api/sauces", authenticateUser, getSauces)
app.post("/api/sauces", authenticateUser , upload.single("image"), createSauce)
app.get("/api/sauces/:id", authenticateUser, getSaucesById)
app.delete("/api/sauces/:id", authenticateUser, deleteSauce)
app.put("/api/sauces/:id", authenticateUser, upload.single("image"), modifSauce)
app.get("/", (req, res) => res.send("Hello World"))
app.post("/api/sauces/:id/like", authenticateUser, likeSauce)

//Listen 
app.use("/images",  express.static(path.join(__dirname, "images")))
app.listen(port, () => console.log("Listening on port ", +port))