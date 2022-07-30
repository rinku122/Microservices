const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
import dotenv from "dotenv";

const PROTO_PATH = path.join(__dirname, "../proto/postService.proto");
const PROTO_OPTIONS = {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
};

class PostClient {
  public client: any;

  constructor() {
    dotenv.config();
    this.connectPostClient();
  }

  public async connectPostClient() {
    const host = process.env.POST_SERVICE_GRPC_CONTAINER_NAME;
    const port = process.env.POST_SERVICE_GRPC_PORT;
    const isSsl = process.env.GRPC_SSL;

    const packageDefination = protoLoader.loadSync(PROTO_PATH, PROTO_OPTIONS);
    const PostService =
      grpc.loadPackageDefinition(packageDefination).PostService;

    this.client = new PostService(
      `${host}:${port}`,
      isSsl === "True"
        ? grpc.credentials.createSsl()
        : grpc.credentials.createInsecure()
    );

    console.log(`Post Client running at - ${host}:${port}`);
  }
}
export default new PostClient();
