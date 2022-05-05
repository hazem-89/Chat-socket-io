import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import config from "config";
import logger from "./utils/logger";
import socket from "./socket"
import { ClientToServerEvents, InterServerEvents, ServerSocketData, ServerToClientEvents } from "../types";

const port = config.get<number>("port")
const host = config.get<string>("host")
const corsOrigin = config.get<string>("corsOrigin")
const app = express();
const httpServer = createServer(app)

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, ServerSocketData>(httpServer, {
  cors:{
    origin: corsOrigin,
    credentials: true,
  }
});

app.get('/', (_, res) => res.send(`Server is running`));


httpServer.listen(port, host, () => {
  logger.info(`Server is running`);
  logger.info(`http://${host}:${port}`);
  socket({ io })
  
})