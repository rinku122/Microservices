import { Request, Router } from "express";
import express from "express";
import UserModel from "./user.model";
import { asyncHandler, response } from "./../../middlewares";
import * as Interfaces from "./../../helpers/interfaces";
import { Response } from "./../../helpers";
import { Redis } from "../../helpers";

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
      .post(this.path + "/getUserPost", this.getUserPost, response)
      .post(
        this.path + "/getUser",
        this.getUserDetailsRedis,
        this.getUser,
        response
      );
  }

  public saveUser = asyncHandler(
    async (
      req: Request,
      res: any,
      next: express.NextFunction
    ): Promise<any> => {
      const data = await UserModel.saveUserDetails(req.body, next);
      res.response = new Response(
        200,
        "User has been added successfuslly..!!",
        data,
        {}
      );
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
      res.response = new Response(
        200,
        "User Posts has been fetched successfuslly..!!",
        data,
        {}
      );
      next();
    }
  );

  public getUserDetailsRedis = asyncHandler(
    async (
      req: Request,
      res: any,
      next: express.NextFunction
    ): Promise<any> => {
      const { email } = req.body;
      let user = await Redis.getString(email);

      if (user === null) {
        return next();
      }
      user = JSON.parse(user);
      res.cached = true;
      res.response = new Response(
        200,
        "User Posts has been cached successfuslly..!!",
        user,
        {}
      );

      return next();
    }
  );

  public getUser = asyncHandler(
    async (
      req: Request,
      res: any,
      next: express.NextFunction
    ): Promise<any> => {
      if (res.cached) {
        return next();
      }
      const data = await UserModel.getUser(req.body, next);
      res.response = new Response(
        200,
        "User  has been fetched successfuslly..!!",
        data,
        {}
      );
      return next();
    }
  );
}

export default UserController;
