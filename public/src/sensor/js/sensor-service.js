app.factory('sensorService', ['$http', function($http) {
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

                alert.success(name + " saved successfully!")
                return res.data;
            }, errorHandler)
        },

        remove: function(id){

        }
    };
} ]);
