import { Users } from "../../models/schema";
import * as Interfaces from "./../../helpers/interfaces";
import express from "express";
import GrpcHelper from "../../helpers/grpc.helper";

class UserModel {
  constructor() {}

  public async saveUserDetails(
    data: Interfaces.User,
    next: express.NextFunction
  ): Promise<any> {
    const { email, name, age } = data;
    const users = new Users({ email, name, age });
    await users.save();
    return users;
  }

  public async getUserPost(
    email: any,
    next: express.NextFunction
  ): Promise<any> {
    const data: any = {};
    const { posts } = await GrpcHelper.getPosts(email);
    let user: any = await Users.findOne(email);
    data.user = user;
    data.posts = posts;
    return data;
  }

  public async increasePostCount(email: string, count: number): Promise<any> {
    try {
      let user: any = await Users.findOne({ email });
      user.postCount = count + 1;
      await user.save();
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserModel();
