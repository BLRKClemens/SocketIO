import express from "express";
import http from "http";
import { Server } from "socket.io";
import fs from "fs";
import https from "https";

const app = express();
let server;
const publicServer = false;
if (publicServer) {
  //These files are autoupdated every 90 days on tools1
  let options = {
    key: fs.readFileSync("C:/Certbot/live/connect.blrk.io/privkey.pem"),
    cert: fs.readFileSync("C:/Certbot/live/connect.blrk.io/fullchain.pem"),
  };
  server = https.createServer(options, app);
} else {
  server = http.createServer(app);
}
const io = new Server(server);

const port = 3000;

app.use(express.static("frontends"));

io.on("connection", (socket) => {
  console.log(`${socket.id} has connected!`);
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
