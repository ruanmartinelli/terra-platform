var qb = require('../data');
var _ = require('lodash');
var Promise = require('bluebird');

const crud = require('../util/crud');

const table = 'sensor';
const columns = [ 'id', 'vendor', 'model', 'code', 'created_at'];

// TODO: Catch/handle database errors
module.exports = {
    get : function(id) {
        return crud.get(id, table, columns);
    },

    add : function(sensor){
        return crud.add(sensor, table, columns);
    },

    update : function(sensor) {
        return crud.update(sensor, table, columns);
    },

    find: function(filter){
        return crud.find(filter, table, columns);
    },

    delete : function(id) {
        return crud.delete(id, table);
    }
};
