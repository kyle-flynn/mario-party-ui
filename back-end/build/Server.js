import express, { json, urlencoded, static as serveStatic, } from "express";
import http from "http";
import https from "https";
import { Server } from "socket.io";
import { join, dirname } from "path";
import cors from "cors";
import dotenv from "dotenv";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
dotenv.config();
const host = process.env.HOST_IP || "127.0.0.1";
const port = process.env.HOST_PORT || "8080";
const mode = process.env.NODE_ENV || "development";
const sslPort = process.env.SSL_PORT || "443";
const keyFile = process.env.SSL_KEY || "";
const certFile = process.env.SSL_CERT || "";
const caFile = process.env.SSL_CHAIN || "";
const data = new Map();
async function createServer(app) {
    const httpsEnabled = mode === "production" &&
        keyFile.length > 0 &&
        certFile.length > 0 &&
        caFile.length > 0;
    if (httpsEnabled) {
        // All SSL env variables must be absolute pathing
        const key = await readFile(keyFile);
        const cert = await readFile(certFile);
        const ca = await readFile(caFile);
        return https.createServer({ key, cert, ca }, app);
    }
    else {
        return http.createServer();
    }
}
async function writeStorage(key, value) {
    try {
        data.set(key, value);
        const fileData = await readFile("../../marioparty.json");
        const jsonData = JSON.parse(fileData.toString());
        jsonData[key] = value;
        await writeFile("../../marioparty.json", JSON.stringify(jsonData));
    }
    catch (e) {
        console.log(e);
    }
}
async function readStorage() {
    try {
        const fileData = await readFile("../../marioparty.json");
        const jsonData = JSON.parse(fileData.toString());
        for (const key in jsonData) {
            data.set(key, jsonData[key]);
        }
        console.log("successfully read data");
    }
    catch (e) {
        console.log("problem reading storage");
        console.log(e);
    }
}
const app = express();
const server = await createServer(app);
const io = new Server(server);
// Read storage
await readStorage();
// Middleware
app.use(cors({ credentials: true }));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(serveStatic(join(__dirname, "../dist")));
app.use("/display/:id", serveStatic(join(__dirname, "../dist")));
app.use("/admin", serveStatic(join(__dirname, "../dist")));
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
        writeStorage("update", update);
    });
    socket.on("display", (display) => {
        socket.broadcast.emit("display", display);
        writeStorage("display", display);
    });
    socket.on("chroma", (chroma) => {
        socket.broadcast.emit("chroma", chroma);
        writeStorage("chroma", chroma);
    });
    socket.on("disconnect", (reason) => {
        console.log("user disconnected: " + reason);
    });
    socket.on("error", (err) => {
        console.log("user error: " + err);
    });
});
/* If in production, enable HTTPS */
if (mode === "production") {
    server.listen(sslPort, () => console.log(`[HTTPS] serving at ${host}:${sslPort} in ${mode} mode.`));
}
else {
    server.listen({ host, port }, () => console.log(`started server on ${host}:${port}`));
}
