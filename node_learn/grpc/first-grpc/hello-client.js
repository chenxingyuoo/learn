var PROTO_PATH = __dirname + '/protos/helloworld.proto';
var grpcLibrary = require('grpc');
const protoLoader = require('@grpc/proto-loader');

function main() {
  const packageDefinition = protoLoader.loadSync(PROTO_PATH);
  const helloProto = grpcLibrary.loadPackageDefinition(packageDefinition);

  console.log('helloProto', helloProto)

  var client = new helloProto.Greeter('localhost:50051', grpcLibrary.credentials.createInsecure());

  console.log('client')
  console.log(client);
  
  
  client.sayHello({name: 'you'}, function(err, response) {
    console.log('Greeting:', response.message);
  });
  client.sayHelloAgain({name: 'you'}, function(err, response) {
    console.log('Greeting:', response.message);
  });
}

main()