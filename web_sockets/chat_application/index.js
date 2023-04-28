const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const PORT = 4500

const app = express()

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})

const webSocketServer = new Server(server)

webSocketServer.on("connection", (socket) => {
    console.log("one user connected");
    socket.on("disconnect", () => {
        console.log("one user disconnected");
    })
})