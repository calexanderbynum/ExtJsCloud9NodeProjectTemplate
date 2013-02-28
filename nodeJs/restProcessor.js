// globals
var responseText;


// only exported function
function process(request, response, params, show_404) {

    
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
    responseText = JSON.stringify(params);
    response.write(responseText);
    response.end();
}




exports.process = process;