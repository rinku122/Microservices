import UserClient from "./../_grpc/clients/user.client";

class GrpcCall {
  constructor() {}

  /**
   * @function fetchUserDetail
   * @returns user
   */
  public async getUserEmail(email: any): Promise<any> {
    return new Promise((resolve, reject) => {
      UserClient.client.getEmail(email, (error: any, response: any) => {
        if (error) reject(error);
        resolve(response);
      });
    });
  }
}

export default new GrpcCall();
