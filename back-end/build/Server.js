import express, { json, urlencoded } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
const server = createServer(app);
const io = new Server(server);
// Middleware
app.use(cors({ credentials: true }));
app.use(json());
app.use(urlencoded({ extended: false }));
io.on("connection", (socket) => {
    console.log("user connected");
    socket.on("update", (update) => {
        socket.emit("update", update);
    });
    socket.on("disconnect", (reason) => {
        console.log("user disconnected: " + reason);
    });
    socket.on("error", (err) => {
        console.log("user error: " + err);
    });
});
server.listen({ host: "127.0.0.1", port: "8080" }, () => console.log("started server"));
