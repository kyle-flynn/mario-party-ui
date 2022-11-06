import express, {
  Application,
  json,
  urlencoded,
  static as serveStatic,
} from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { join } from "path";
import cors from "cors";

const app: Application = express();
const server = createServer(app);
const io = new Server(server);

// Middleware
app.use(cors({ credentials: true }));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(serveStatic(join(__dirname, "../public")));

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("update", (update) => {
    socket.broadcast.emit("update", update);
  });

  socket.on("display", (display) => {
    socket.broadcast.emit("display", display);
  });

  socket.on("chroma", (chroma) => {
    socket.broadcast.emit("chroma", chroma);
  });

  socket.on("disconnect", (reason: string) => {
    console.log("user disconnected: " + reason);
  });

  socket.on("error", (err) => {
    console.log("user error: " + err);
  });
});

server.listen({ host: "127.0.0.1", port: "8080" }, () =>
  console.log("started server")
);
