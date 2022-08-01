import { Users } from "../../models/schema";
import * as Interfaces from "./../../helpers/interfaces";
import express from "express";
import GrpcHelper from "../../helpers/grpc.helper";
import RedisHelper from "../../helpers/redis.helper";
import QueService from "../../queService/que.Service";

class UserModel {
  constructor() {}

  public async saveUserDetails(
    data: Interfaces.User,
    next: express.NextFunction
  ): Promise<any> {
    const { email, name, age } = data;
    const users = new Users({ email, name, age });
    await users.save();
    QueService.createUserInRedisQue(data);
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

  public async getUser(email: any, next: express.NextFunction): Promise<any> {
    let user: any = await Users.findOne(email);
    return user;
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

  public async setUserInRedis(data: any): Promise<any> {
    try {
      RedisHelper.setString(data["email"], JSON.stringify(data));
      console.log("User has been created successfully..!!");
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserModel();
