import { Posts } from "../../models/schema";
import * as Interfaces from "../../helpers/interfaces";
import express from "express";
import ErrorResponse from "../../helpers/error";

class PostModel {
  constructor() {}

  public async savePostDetails(
    data: Interfaces.Post,
    next: express.NextFunction
  ): Promise<any> {
    const email = await Posts.findOne({ email: data.email });
    // if (!email) {
    //   return next(new ErrorResponse("User is not logged in"));
    // }
    const post = new Posts(data);
    await post.save();
    return post;
  }
}

export default new PostModel();
