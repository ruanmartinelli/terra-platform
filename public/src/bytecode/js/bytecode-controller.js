BytecodeListController.$inject = ['$scope', 'Upload','$http', 'sensorService']
function BytecodeListController($scope, Upload, $http, sensorService){
    $scope.bytecode = {};



    $scope.upload = function(file){
        var fd = new FormData();

        fd.append("lastModified", file.lastModified);
        fd.append("lastModifiedDate", file.lastModifiedDate);
        fd.append("name", file.name);
        fd.append("size", file.size);
        fd.append("type", file.type);
        fd.append("webkitRelativePath", file.webkitRelativePath);

        console.log(fd.lastModified);
        $http.post('/api/bytecode/new',
                    fd,
                    {
        	    		transformRequest : angular.identity,
        	    		headers : {
        	    			'Content-Type' : undefined
        	    		}
                    })
        .then(response => {
            console.log(response);
        })
        // file.upload = Upload.upload({
        //     url: 'http://localhost:7000/api/bytecode/new',
        //     data: {file: file}
        // });
        //
        // file.upload.then(function (response){
        //     $timeout(function () {
        //         console.log(response.data);
        //         file.result = response.data;
        //     });
        // }, function (response) {
        //     if (response.status > 0)
        //     $scope.errorMsg = response.status + ': ' + response.data;
        // }, function (evt) {
        // })

    }
}

BytecodeNewController.$inject = ['$scope', 'sensorService'];
function BytecodeNewController($scope, sensorService){
}

SensorEditController.$inject = ['$scope','$routeParams', 'sensorService'];
function SensorEditController($scope, $routeParams, sensorService){
}


app.controller('BytecodeListController',BytecodeListController);
app.controller('BytecodeNewController', BytecodeNewController);
app.controller('SensorEditController',SensorEditController);
