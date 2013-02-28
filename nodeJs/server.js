var http = require("http");

function start(route) {
    console.log('Server Started');
    
    function onRequest(request, response) {
        route(request, response);
}
    
    http.createServer(onRequest).listen(process.env.PORT, process.env.IP);

} // end of start function

exports.start = start;