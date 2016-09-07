DashboardController.$inject = ['$scope', 'dashboardService']
function DashboardController($scope, dashboardService){
    $scope.log = [];

    let promises = [];
    promises.push(dashboardService.getMessageLog())

    Promise.all(promises)
    .then(results => {
        $scope.log = results[0];

    })
}
app.controller('DashboardController',DashboardController);
