import { Post } from "./../helpers/interfaces";
import RabbitMqHelper from "../helpers/rabbitMq.helper";
import { RabbitMqContants } from "./../constants";
import Postmodel from "./../modules/postDetails/post.model";

class QuesService {
  constructor() {}

  public async createPostQue(data: Post, postDetails: any) {
    RabbitMqHelper.createQue(RabbitMqContants.MAKE_A_POST, data);
    RabbitMqHelper.createQue(RabbitMqContants.INCREASE_USER_COUNT, postDetails);
  }

  public consumePostQue(data: Post) {
    Postmodel._savePostDetails(data);
  }
}

export default new QuesService();
