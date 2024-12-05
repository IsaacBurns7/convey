const express = require('express');
const path = require('path');
const app = express()
const PORT = 3000 || process.env.PORT

const clientBuildPath = path.join(__dirname,"../");

//app.use(express.static(path.join(clientBuildPath, "./dist"))); //all statics are from this folder? 
app.use(express.static(clientBuildPath))
//figure out how to only serve the static folder ? 

app.get("/", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "/index.html"));
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})

//note: to make multiplayer, use socketio with webRTC