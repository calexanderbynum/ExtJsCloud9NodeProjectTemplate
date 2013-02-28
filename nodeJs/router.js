var url = require("url");
var path = require('path');
var queryString = require("querystring");
var fs = require('fs');


var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};


function route(request, response) {


    var requestPath = url.parse(request.url).pathname;

    if (requestPath.indexOf('/ajaxHandler') !== -1) {
        ajaxHandler(request, response);
    }
    else if (requestPath.indexOf('/project') !== -1) {
        serveFile(request, response);
    }

    else {
        show_404(request, response);

    }


}

function ajaxHandler(request, response) {
    if (request.method !== 'POST') {
        show_404(request, response);
    }
    else { // actual code: last thing is handling good requests.
        try {
            var body = '';
            var params = '';

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
        catch (e) {
            show_404(request, response);
        }
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
    try {
        var uri = url.parse(request.url).pathname;
        uri = uri.replace('/projects', ''); // obfuscates physical file path from exposed paths
        var filename = path.join(process.cwd(), uri);
        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];

        if(mimeType === undefined){ // only serve files of types you want to serve:: white list approach
            show_404(request, response);            
        }

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

            response.writeHead(200, mimeType);

            var fileStream = fs.createReadStream(filename);
            fileStream.pipe(response);

        }); //end path.exists
    }
    catch (e) {
        show_404(request, response);
    }
}

exports.route = route;