import UserModel from "../modules/userDetails/user.model";

class QueService {
  constructor() {}

  public async consumePostQue(email: string, count: number) {
    console.log(email, count);
    await UserModel.increasePostCount(email, count);
  }
}

export default new QueService();
