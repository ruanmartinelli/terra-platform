var app = angular.module('terraweb', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'angular-loading-bar', 'angularUtils.directives.dirPagination']);

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


    .otherwise({ redirectTo: '/' });
} ]);
