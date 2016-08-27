SensorListController.$inject = ['$scope', 'sensorService']
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

SensorNewController.$inject = ['$scope', 'sensorService'];
function SensorNewController($scope, sensorService){
    $scope.sensor = {};

    let promises = [];

    $scope.add = sensorService.add;
}

SensorEditController.$inject = ['$scope','$routeParams', 'sensorService'];
function SensorEditController($scope, $routeParams, sensorService){
    $scope.sensor = {};

    let promises = [];
    let getSensor = sensorService.get($routeParams.id);

    promises.push(getSensor);

    Promise.all(promises)
    .then(result => {
        $scope.sensor = result[0];
    })

    $scope.update = sensorService.update;
}





app.controller('SensorListController',SensorListController);
app.controller('SensorNewController', SensorNewController);
app.controller('SensorEditController',SensorEditController);
