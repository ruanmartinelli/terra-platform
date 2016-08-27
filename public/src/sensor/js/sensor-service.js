app.factory('sensorService', ['$http', '$location',function($http, $location) {
    return {
        get : function(id) {
            return $http
            .get('api/sensors/' + id)
            .then(res => {
                return res.data;
            }, errorHandler)
        },

        add: function(sensor){
            return $http
            .post('api/sensors/new', sensor)
            .then(res => {
                alert.success("Sensor saved successfully!");
                $location.path('/sensors');
                return res.data;
            }, errorHandler)
        },

        find: function(filter){
            return $http
            .post('api/sensors/', filter)
            .then(res => {
                return res.data;
            }, errorHandler)
        },

        update: function(sensor){
            return $http
            .put('api/sensors/', sensor)
            .then(res => {
                let name = res.data.nome;

                $location.path('/sensors');
                alert.success("Sensor saved successfully!")
                return res.data;
            }, errorHandler)
        },

        remove: function(id){
            alert.warning("Please implement me")
        }
    };
} ]);
