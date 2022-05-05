import { createServer } from "http";
import Koa from "koa";
import { Server, Socket } from "socket.io";
const app: Koa = new Koa();

const httpServer = createServer(app.callback);

const io = new Server(httpServer);

io.on("connection", (socket: Socket) => {
  console.log("test test", socket.data);
});

export default app;
