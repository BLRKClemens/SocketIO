import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 3000;

app.use(express.static("frontends"));

io.on("connection", (socket) => {
    console.log(`${socket.id} has connected!`);
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});