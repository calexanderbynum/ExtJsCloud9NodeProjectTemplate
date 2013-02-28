function process(request, response, params, show_404) {

    var responseText;
    var xaction = params.xaction;


    switch (xaction) {

    case 'actionToDo':
        actionToDo(params);
        break;

    default:
        show_404(request, response)
        break;

    }




function actionToDo(){
    responseText = JSON.stringify(params);
    response.write(responseText);
    response.end();
    
}

}


exports.process = process;