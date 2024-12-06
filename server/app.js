const express = require('express');
const path = require('path');
const app = express()
const PORT = 8080 || process.env.PORT

const clientBuildPath = path.join(__dirname,"../");

//app.use(express.static(path.join(clientBuildPath, "./dist"))); //all statics are from this folder? 
console.log("INCLUDING STATICS");
app.use(express.static(clientBuildPath))
//figure out how to only serve the static folder ? 

console.log("Starting GET")
app.get("/", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "/index.html"));
    console.log("Example app starting!");
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})

//note: to make multiplayer, use socketio with webRTC