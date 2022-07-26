import { Request, Router } from "express";
import express from "express";
import ErrorResponse from "../../helpers/error";
import { GrpcClient } from "./../../helpers";
import PostModel from "./post.model";
import { asyncHandler, response } from "../../middlewares";
import * as Interfaces from "../../helpers/interfaces";
import { Response } from "../../helpers";

class PostController implements Interfaces.Controller {
  public path = "/posts";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public async initializeRoutes() {
    this.router
      .all(`${this.path}/*`)
      .post(this.path + "/savePost", this.savePost, response);
  }

  public savePost = asyncHandler(
    async (
      req: Request,
      res: any,
      next: express.NextFunction
    ): Promise<any> => {
      const { email } = req.body;
      const response = await GrpcClient.getUserEmail({ email });
      if (response.error) {
        return next(new ErrorResponse("User not registered", 400));
      } else {
        const data = await PostModel.savePostDetails(req.body, next);
        res.response = new Response(200, data, null);
      }

      next();
    }
  );
}

export default PostController;
