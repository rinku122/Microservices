const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
import dotenv from "dotenv";

const PROTO_PATH = path.join(__dirname, "../proto/userService.proto");
const PROTO_OPTIONS = {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
};

class UserClient {
  public client: any;

  constructor() {
    dotenv.config();
    this.connectUserClient();
  }

  public async connectUserClient() {
    const host = process.env.USER_SERVICE_GRPC_CONTAINER_NAME;
    const port = process.env.USER_SERVICE_GRPC_PORT;
    const isSsl = process.env.GRPC_SSL;

    const packageDefination = protoLoader.loadSync(PROTO_PATH, PROTO_OPTIONS);
    const UserService =
      grpc.loadPackageDefinition(packageDefination).UserService;

    this.client = new UserService(
      `${host}:${port}`,
      isSsl === "True"
        ? grpc.credentials.createSsl()
        : grpc.credentials.createInsecure()
    );

    console.log(`User Client running at - ${host}:${port}`);
  }
}
export default new UserClient();
