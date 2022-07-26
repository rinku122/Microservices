import dotenv from "dotenv";
import express from "express";
import * as http from "http";
import { MongoDBHelper } from "./helpers";
import Controllers from "./modules";
import errorHandler from "./middlewares/errorHandler";
import Grpc from "../_grpc/app";
import { colors } from "colors.ts";

class App {
  public app: express.Application;
  public port: any;
  private server: http.Server;

  constructor() {
    dotenv.config();
    colors("", "");

    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);
    this.startServer();
    this.startGRPCServer();

    MongoDBHelper.connectMongoDB();
    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeErrorHandling();
  }

  private startServer() {
    this.server.listen(this.port, () => {
      console.log(`App is running on ${process.env.NODE_ENV} mode`.yellow);
      console.log(`User service is running on PORT : ${this.port} `.yellow);
    });
  }

  private startGRPCServer() {
    const grpc = new Grpc();
    grpc.startServer();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeControllers() {
    Controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
    this.app.get("/users/app/status", (req, res) => {
      res.status(200).send({ status: "success" });
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }
}

export default new App();
