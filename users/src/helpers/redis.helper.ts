import * as redis from "redis";

class Redis {
  private client!: redis.RedisClient;
  constructor() {
    this.connectClient();
  }

  private connectClient() {
    const host: any = process.env.REDIS_HOSTNAME!;
    const port: string = process.env.REDIS_PORT!;

    this.client = redis.createClient(port, host);

    this.client.on("connect", () =>
      console.log("Redis::Connected Successfully..!!")
    );
  }

  public async setString(
    key: string,
    value: string,
    database: string = "",
    expires: number = 0
  ): Promise<any> {
    try {
      if (database !== "") {
        this.client.select(database);
      }
      this.client.set(key, value, (error: any, success: any) => {
        if (error) {
          return error;
        }

        if (expires !== 0) {
          this.client.expire(key, expires * 60);
        }

        return success;
      });
    } catch (error) {
      return error;
    }
  }

  public async getString(key: string, database: string = "0"): Promise<any> {
    return new Promise(async (resolve) => {
      if (database !== "") {
        this.client.select(database);
      }
      this.client.get(key, (error, success) => {
        if (error) {
          return error;
        }
        resolve(success);
      });
    });
  }

  public async createUserObject(user: any) {
    user = JSON.parse(user);
    return user;
  }
}

export default new Redis();
