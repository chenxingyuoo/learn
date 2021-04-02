const PROTO_PATH = __dirname + '/protos/helloworld.proto';
const grpcLibrary = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}

function sayHello(call, callback) {
  callback(null, {message: 'Hello ' + call.request.name});
}

function sayHelloAgain(call, callback) {
  callback(null, {message: 'Hello again, ' + call.request.name});
}

function main() {
  // var protoDescriptor = protoLoader.loadSync(PROTO_PATH);
  const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
  const helloProto = grpcLibrary.loadPackageDefinition(packageDefinition);
  console.log('helloProto')
  console.log(helloProto)
  
  // The protoDescriptor object has the full package hierarchy
  var server = new grpcLibrary.Server();
  server.addProtoService(helloProto.Greeter.service, {
    sayHello: sayHello, 
    sayHelloAgain: sayHelloAgain
  });
  server.bind('0.0.0.0:50051', grpcLibrary.ServerCredentials.createInsecure());
  server.start();
}

main()