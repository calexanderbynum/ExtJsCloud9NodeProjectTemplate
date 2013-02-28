Ext.application({
    name: 'alexAndAndrew',
    launch: function() {

        initialize();

    }
});


function initialize() {

    console.log('Hello World');

function exampleAjaxCall(){
    var testVar = 'alexIsAwesome';
    var testVar1 = 12;
    

Ext.Ajax.request({
            url: '/',
            success: function (response) { // success here is based on a 200 code from server, nothing more
               var decodedResponse = Ext.decode(response.responseText);
                console.log('response data::', decodedResponse); // check it in console :: json is sweet
                

            }, failure: function () { // not 200 code from server - you can see the codes in the net tab
                console.log('error happened');
            },
            params: { 
                xaction: 'actionToDo',
                param1: 'param1',
                testVar: testVar,
                testVar1: testVar1
                
            }
        });

}

    Ext.create('Ext.container.Viewport', {
        id: 'myViewPort',
        layout: 'border',
        items: [{
            region: 'west',
            id: 'regionWest',
            width: 200,
            scrollable: true,
            border: true,
            html: 'west region',
            autoScroll: true,
            layout: 'fit'
        }, {
            region: 'north',
            id: 'regionNorth',
            height: 58,
            scrollable: true,
            border: false,
            html: 'north region',
            layout: 'column',
            items: []
        }, {
            region: 'center',
            id: 'centerRegionSummary',
            scrollable: true,
            layout: 'fit',
            border: false,
            xtype: 'panel',
            html: 'center region',
            items: [{
                xtype: 'button',
                text: 'Press Me!',
                handler: function(){
                // example of anonymous function
                // I do this for all my handlers because it allows me to do prevalidation/ processing
                    exampleAjaxCall();  // usually when calling a function make sure the function is defined previous to the call
                    // that means farthur up in the document - won't matter with good code separation and minification, but meh
                }
            }]
        }]
    });

}