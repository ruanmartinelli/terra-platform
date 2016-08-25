function SensorListController($scope, sensorService){
    $scope.sensors = [];

    let promises = [];
    let findAll = sensorService.find({});

    promises.push(findAll);

    Promise.all(promises)
    .then(result => {
        $scope.sensors = result[0];
    })

    $scope.find = sensorService.find;
}

function SensorNewController($scope){

}

function SensorEditController($scope, $routeParams){

}




SensorListController.$inject = ['$scope', 'sensorService']
SensorNewController.$inject = ['$scope']
SensorEditController.$inject = ['$scope','$routeParams']

app.controller('SensorListController',SensorListController)
app.controller('SensorNewController', SensorNewController)
app.controller('SensorEditController',SensorEditController)
