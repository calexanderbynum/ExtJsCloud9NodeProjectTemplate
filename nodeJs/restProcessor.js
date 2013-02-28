// globals
var responseText;
var error;

// only exported function
function process(request, response, params, show_404) {
error = show_404;
    
    var xaction = params.xaction;

    switch (xaction) {

    case 'actionToDo':
        actionToDo(request, response, params);
        break;

    default:
        show_404(request, response)
        break;

    }
}


// private methods
function actionToDo(request, response, params){
    try{
    responseText = JSON.stringify(params);
    response.write(responseText);
    }catch(e){
        
        error(request, response);
    }
    // finally : prevent memory leaks?
    response.end();
}




exports.process = process;