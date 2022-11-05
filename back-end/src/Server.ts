import express, { Application, json, urlencoded } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const server = createServer(app);
const io = new Server(server);

// Middleware
app.use(cors({ credentials: true }));
app.use(json());
app.use(urlencoded({ extended: false }));

const data: Map<string, unknown> = new Map();

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

  socket.on("disconnect", (reason: string) => {
    console.log("user disconnected: " + reason);
  });

  socket.on("error", (err) => {
    console.log("user error: " + err);
  });
});

const host = process.env.HOST_API || '127.0.0.1';
const port = process.env.HOST_PORT || '8080';

server.listen({ host, port }, () =>
  console.log(`started server on ${host}:${port}`)
);
