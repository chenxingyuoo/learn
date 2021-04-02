var PROTO_PATH = __dirname + '/protos/helloworld.proto';
var grpcLibrary = require('grpc');
const protoLoader = require('@grpc/proto-loader');

module.exports = () => {
  const packageDefinition = protoLoader.loadSync(PROTO_PATH);
  const helloProto = grpcLibrary.loadPackageDefinition(packageDefinition);
  return helloProto
}