import express, {
  Application,
  json,
  urlencoded,
  static as serveStatic,
} from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { join, dirname } from "path";
import cors from "cors";
import dotenv from "dotenv";
import { readFile } from "fs/promises";
import https from "https";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

dotenv.config();

const app: Application = express();
const server = createServer(app);
const io = new Server(server);

// Middleware
app.use(cors({ credentials: true }));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(serveStatic(join(__dirname, "../public")));
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

const host = process.env.HOST_IP || "127.0.0.1";
const port = process.env.HOST_PORT || "8080";
const mode = process.env.NODE_ENV || "development";
const sslPort = process.env.SSL_PORT || "443";

server.listen({ host, port }, () =>
  console.log(`started server on ${host}:${port}`)
);

/* If in production, enable HTTPS */
if (mode === "production") {
  const keyFile = process.env.SSL_KEY || "";
  const certFile = process.env.SSL_CERT || "";
  const caFile = process.env.SSL_CHAIN || "";

  // All SSL env variables must be absolute pathing
  const key = await readFile(keyFile);
  const cert = await readFile(certFile);
  const ca = await readFile(caFile);

  const appHttps = https.createServer({ key, cert, ca }, app);
  appHttps.listen(sslPort, () =>
    console.log(`[HTTPS] serving at ${host}:${sslPort} in ${mode} mode.`)
  );
}
