app.factory('dashboardService', ['$http', '$location',function($http, $location) {
    return {
        getMessageLog : function() {
            return $http.post('/api/messages/', {})
            .then(res => {
                let log = [];
                _.forEach(res.data, (mObject) => { log.push(this.createMessage(mObject))})
                return log
            }, errorHandler)
        },
        createMessage: function(object){
            return "[" + object.created_at +"]" + "  Sensor " + object.id_sensor + "  | Message Content: " + object.content;
        }

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
