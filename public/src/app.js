var app = angular.module('terraweb',
['ngRoute', 'ui.bootstrap', 'ngAnimate', 'angular-loading-bar', 'angularUtils.directives.dirPagination', 'ngFileUpload']);

var socket = io();
socket.on('new_data', function(msg){
    console.log(msg);
    $('#messages').append($('<li>').text(msg));
});

var alert = function(){
    return {
        success: function(message, title, options){
            toastr.success(message, title || "Success", options)
        },
        warning: function(message, title, options){
            toastr.warning(message, title || "Warning", options)
        },
        error: function(message, title, options){
            toastr.error(message, title || "Error", options)
        },
        info: function(message, title, options){
            toastr.info(message, title || "Info", options)
        }
    }
}();

function errorHandler(error){
    console.log("Error:", error);

    let e = error.data;

    if(e.status && e.message){
        alert.error(e.message)
    }else{
        alert.error("Something went wrong =(")
    }
}


app.run([ '$rootScope', '$location','$uibModal','$q',
function($rootScope, $location, $uibModal, $q) {
    Promise = $q;

    // TODO check for token here
}])

// routes
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // Sensor
    .when('/sensors/', {
        controller : 'SensorListController',
        templateUrl : 'src/sensor/html/sensor-list.html'
    })
    .when('/sensors/new', {
        controller : 'SensorNewController',
        templateUrl : 'src/sensor/html/sensor-new.html'
    })
    .when('/sensors/:id', {
        controller : 'SensorEditController',
        templateUrl : 'src/sensor/html/sensor-edit.html'
    })

    // dashboard
    .when('/dashboard/', {
        controller : 'DashboardListController',
        templateUrl : 'src/sensor/html/sensor-list.html'
    })

    //bytecodes
    .when('/bytecodes/', {
        controller : 'BytecodeListController',
        templateUrl : 'src/bytecode/html/bytecode-list.html'
    })
    .when('/bytecodes/new', {
        controller : 'BytecodeNewController',
        templateUrl : 'src/bytecode/html/bytecode-new.html'
    })
    .when('/bytecodes/:id', {
        controller : 'BytecodeEditController',
        templateUrl : 'src/bytecode/html/bytecode-edit.html'
    })


    .otherwise({ redirectTo: '/' });
} ]);
