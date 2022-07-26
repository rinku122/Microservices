import mongoose from "mongoose";

class MongoHelper {
  private host: any = process.env.MONGO_HOSTNAME;
  private port: string = process.env.MONGO_PORT!;
  private userName: string = process.env.MONGO_USERNAME!;
  private pwd: string = process.env.MONGO_PASSWORD!;
  private db: string = process.env.MONGO_DATABASE!;
  private env: string = process.env.NODE_ENV!;

  constructor() {}
  /**
   * connect Mongo DB
   */
  public async connectMongoDB() {
    this.env = process.env.NODE_ENV!;
    this.host = process.env.MONGO_HOSTNAME;
    this.port = process.env.MONGO_PORT!;
    this.userName = process.env.MONGO_USERNAME!;
    this.pwd = process.env.MONGO_PASSWORD!;
    this.db = process.env.MONGO_DATABASE!;

    let url = `mongodb://${this.host}:${this.port}/${this.db}`;
    let options: any = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    try {
      const conn = await mongoose.connect(url, options);
      console.log("MongoDB: Connected Successfully.!!".black.bg_white);
    } catch (error) {
      console.log(error);
      console.log("MongoDb: Failed To Connect.!!".black.bg_red);
    }
    mongoose.set("debug", true);
  }
}

export default new MongoHelper();
