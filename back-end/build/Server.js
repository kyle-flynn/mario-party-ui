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
const data = new Map();
io.on("connection", (socket) => {
    console.log("user connected");
    if (data.size > 0) {
        console.log("sending user recorded data");
        const channels = Array.from(data.keys());
        for (const channel of channels) {
            socket.emit(channel, data.get(channel));
        }
    }
    socket.on("update", (update) => {
        socket.broadcast.emit("update", update);
        data.set("update", update);
    });
    socket.on("display", (display) => {
        socket.broadcast.emit("display", display);
        data.set("display", display);
    });
    socket.on("chroma", (chroma) => {
        socket.broadcast.emit("chroma", chroma);
        data.set("chroma", chroma);
    });
    socket.on("disconnect", (reason) => {
        console.log("user disconnected: " + reason);
    });
    socket.on("error", (err) => {
        console.log("user error: " + err);
    });
});
server.listen({ host: "127.0.0.1", port: "8080" }, () => console.log("started server"));
