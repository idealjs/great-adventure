import { createServer } from "http";
import Koa from "koa";
import { Server, Socket } from "socket.io";
const app: Koa = new Koa();

const httpServer = createServer(app.callback());

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {});

export default httpServer;
