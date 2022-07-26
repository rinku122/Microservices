import { Users } from "../../models/schema";
import * as Interfaces from "./../../helpers/interfaces";

class UserModel {
  constructor() {}

  public async saveUserDetails(data: Interfaces.User): Promise<any> {
    const users = new Users(data);
    await users.save();
    return users;
  }
}

export default new UserModel();
