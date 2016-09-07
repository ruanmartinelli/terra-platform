app.factory('dashboardService', ['$http', '$location',function($http, $location) {
    return {
        getMessageLog : function() {
            return $http.post('/api/messages/', {})
            .then(res => {
                return createLogString(res.data);
            }, errorHandler)
        },

    };
} ]);

function createLogString(logArray){
    let log = "";
    _.forEach(logArray, l => {
        let message = "[" + l.created_at +"]" + "  Sensor " + l.id_sensor + "  | Message Content: " + l.content;
        log += message + "\n";
    })
    return log;
}
