import { GrpcObject } from "@grpc/grpc-js/build/src/make-client";
import { loadSync, PackageDefinition } from "@grpc/proto-loader";
import {
  loadPackageDefinition,
  Server,
  ServerCredentials,
} from "@grpc/grpc-js";
import path from "path";

const PROTO_PATH = path.join(__dirname, "./proto/postService.proto");

const PROTO_OPTIONS = {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
};

interface ServerDefinition extends GrpcObject {
  service: any;
}

interface ServerPackage extends GrpcObject {
  [name: string]: ServerDefinition;
}

class Grpc {
  constructor() {}

  /**
   * @function startServer
   * @returns Start GRPC Server
   */
  public async startServer() {
    const host = process.env.POST_SERVICE_GRPC_CONTAINER_NAME;
    const port = process.env.POST_SERVICE_GRPC_PORT;
    const grpcPackageDefination = loadSync(PROTO_PATH, PROTO_OPTIONS);
    const proto = loadPackageDefinition(grpcPackageDefination) as ServerPackage;
    const server = new Server();

    server.bindAsync(
      `${host}:${port}`,
      ServerCredentials.createInsecure(),
      (error: any) => {
        if (error) return console.log("GRPC:: Failed To Connect..!!");
        console.log(`GRPC has been started on - ${host}:${port}`.black.bg_white);
        server.start();
      }
    );
  }
}

export default Grpc;
