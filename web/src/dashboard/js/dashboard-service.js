app.factory('dashboardService', ['$http', '$location',function($http, $location) {
    return {
        getMessages : function() {
            return $http.post('/api/messages/', {})
            .then(res => {
                return res.data
            }, errorHandler)
        },
        createMessage: function(object){
            return "[" + object.created_at +"]" + "  Sensor " + object.id_sensor + "  | Message Content: " + object.content;
        },
        createLogFromMessages: function(messages){
            let log = [];
            _.forEach(messages, (mObject) => { log.push(this.createMessage(mObject))})
            return log
        },
        createChartFromMessages: function(log){
            let labels = [];
            let data = [];
            let stop = 0;
            _.forEachRight(log, l => {
                if(stop < 30){
                    labels.push (l.created_at);
                    data.push   (l.content);
                }
                stop++;
            })
            data = [data]; // needs to be a double array

            return { data, labels }
        },
        updateChart: function(chart, message){
            chart.data[0]      = _.drop(chart.data[0], 1);
            chart.labels    = _.drop(chart.labels, 1);

            chart.labels.push   (message.created_at);
            chart.data[0].push     (message.content);
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
