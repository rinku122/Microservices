import PostClient from "../../_grpc/clients/post.client";

class GrpcCall {
  constructor() {}

  /**
   * @function fetchUserDetail
   * @returns user
   */
  public async getPosts(email: any): Promise<any> {
    return new Promise((resolve, reject) => {
      PostClient.client.getPosts(email, (error: any, response: any) => {
        if (error) reject(error);
        resolve(response);
      });
    });
  }
}

export default new GrpcCall();
