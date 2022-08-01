import UserModel from "../modules/userDetails/user.model";
import * as Interfaces from "./../helpers/interfaces";
import { RabbitMqContants } from "../constants";
import { RabbitMqHelper } from "./../helpers";

class QueService {
  constructor() {}

  public async consumePostQue(email: string, count: number) {
    await UserModel.increasePostCount(email, count);
  }

  public async createUserInRedisQue(user: Interfaces.User) {
    RabbitMqHelper.createQue(RabbitMqContants.ADD_IN_REDIS, user);
  }

  public async consumeUserInRedisQue(user: Interfaces.User) {
    await UserModel.setUserInRedis(user);
  }
}

export default new QueService();
