import { Request, Router } from "express";
import express from "express";
import ErrorResponse from "../../helpers/error";
import { GrpcClient } from "./../../helpers";
import { asyncHandler, response } from "../../middlewares";
import * as Interfaces from "../../helpers/interfaces";
import { Response } from "../../helpers";
import QueService from "../../queServices/que.service";
import PostModel from "./post.model";

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
        const post: Interfaces.Post = req.body;
        const count = await PostModel.getPostCount(req.body.email);
        const postdetails = { count, email: req.body.email };
        await QueService.createPostQue(post, postdetails);
        res.response = new Response(
          200,
          "Post has been added Successfully..!!",
          {},
          {}
        );
      }

      next();
    }

    
  );
}

export default PostController;
