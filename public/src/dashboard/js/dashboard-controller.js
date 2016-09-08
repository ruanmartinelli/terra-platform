DashboardController.$inject = ['$scope', 'dashboardService', 'socket']
function DashboardController($scope, dashboardService, socket){
    $scope.log = [];
    $scope.chart = {};
    $scope.status = {
        webCore: [],
        coreProxy: [],
        proxyWSN: []
    }
    let promises = [];
    promises.push(dashboardService.getMessages())

    Promise.all(promises)
    .then(results => {
        $scope.log = dashboardService.createLogFromMessages(results[0]);
        $scope.chart = dashboardService.createChartFromMessages(results[0]);
    })

    // Socket listeners
    socket.on('log:message', function(msg){
        $scope.log.push(dashboardService.createMessage(msg))
        dashboardService.updateChart($scope.chart, msg)
    });

    socket.on('status:core', function(status){
        console.log("Core server connected? ", status);
        $scope.status.webCore = status;

        let connection = $scope.status.webCore[0];
        if(connection == "ONLINE") $scope.status.webCore[3] = "text-success";
        if(connection == "OFFLINE") $scope.status.webCore[3] = "text-danger";
    });

    socket.on('status:proxy', function(status){
        console.log("Proxy server connected? ", status);
        $scope.status.coreProxy = status;

        let connection = $scope.status.coreProxy[0];
        if(connection == "ONLINE") $scope.status.coreProxy[3] = "text-success";
        if(connection == "OFFLINE") $scope.status.coreProxy[3] = "text-danger";
    });
    socket.on('status:wsn', function(status){
        // TODO
    });
}
app.controller('DashboardController',DashboardController);
