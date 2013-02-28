var http = require("http");
var url = require("url");
var queryString = require("querystring");
var path = require('path');
var fs = require('fs');

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};


function start() {
    console.log('Server Started');
    http.createServer(function(request, response) {
        var requestPath = url.parse(request.url).pathname;

        switch (requestPath) {
        case '/':
            ajaxHandler(request, response);
            break;



        default:
            //show_404(request, response);
            break;
        }

        if (requestPath.length > 1) {
            serveFile(request, response);
        }
    }).listen(process.env.PORT, process.env.IP);


    function ajaxHandler(request, response) {

        var params = '';

        if (request.method == 'POST') {
            var body = '';

            request.on('data', function(data) {
                body += data;
            });

            request.on('end', function() {
                params = JSON.stringify(queryString.parse(body));
                console.log('request::', params);
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write(params);
                response.end();
            }); // closes the end event handler
        }
        else {
            JSON.stringify(queryString.parse(request.queryString));
            console.log('was a GET request:: dont accept those params right now', params);
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.write('{success: true, data: "do not send GETs to ajax handler  }');

            response.end();
        }

    }

    function show_404(request, response) {
        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        response.write('404 - Please try again.');
        response.end();
    }


    function serveFile(request, response) {

        var uri = url.parse(request.url).pathname;
        var filename = path.join(process.cwd(), uri);

        fs.exists(filename, function(exists) {
            if (!exists) {
                console.log("not exists: " + filename);
                response.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                response.write('404 Not Found\n');
                response.end();
                return false;
            }
            var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
            response.writeHead(200, mimeType);

            var fileStream = fs.createReadStream(filename);
            fileStream.pipe(response);

        }); //end path.exists

    }

} // end of start function

exports.start = start;