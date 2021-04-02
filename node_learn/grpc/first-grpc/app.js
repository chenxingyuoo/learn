
var PROTO_PATH = __dirname + '/protos/route_guide.proto';
var grpc = require('grpc');
var protoDescriptor = grpc.load(PROTO_PATH);
// The protoDescriptor object has the full package hierarchy
var routeguide = protoDescriptor.routeguide;


function getServer() {
  var server = new grpc.Server();
  server.addProtoService(routeguide.RouteGuide.service, {
    getFeature: getFeature,
    listFeatures: listFeatures,
    recordRoute: recordRoute,
    routeChat: routeChat
  });
  return server;
}
var routeServer = getServer();
routeServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
routeServer.start();
