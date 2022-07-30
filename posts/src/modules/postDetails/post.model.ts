import { Posts } from "../../models/schema";
import * as Interfaces from "../../helpers/interfaces";

class PostModel {
  constructor() {}

  public async _savePostDetails(post: Interfaces.Post): Promise<any> {
    const _post = new Posts(post);
    await _post.save();
    console.log("Post is created");
  }

  public async getPostCount(email: string): Promise<any> {
    const count = await Posts.find({ email }).count();
    return count;
  }
}

export default new PostModel();
