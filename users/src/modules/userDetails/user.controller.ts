import { Request, Router } from "express";
import express from "express";
import ErrorResponse from "../../helpers/error";
import UserModel from "./user.model";
import { asyncHandler, response } from "./../../middlewares";
import * as Interfaces from "./../../helpers/interfaces";
import { Response } from "./../../helpers";

class UserController implements Interfaces.Controller {
  public path = "/users";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public async initializeRoutes() {
    this.router
      .all(`${this.path}/*`)
      .post(this.path + "/saveUser", this.saveUser, response)
      .post(this.path + "/getUser", this.getUserPost, response);
  }

  public saveUser = asyncHandler(
    async (
      req: Request,
      res: any,
      next: express.NextFunction
    ): Promise<any> => {
      const data = await UserModel.saveUserDetails(req.body, next);
      res.response = new Response(200, data, null);
      next();
    }
  );

  public getUserPost = asyncHandler(
    async (
      req: Request,
      res: any,
      next: express.NextFunction
    ): Promise<any> => {
      const data = await UserModel.getUserPost(req.body, next);
      res.response = new Response(200, data, null);
      next();
    }
  );
}

export default UserController;
