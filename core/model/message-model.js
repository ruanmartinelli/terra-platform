var qb = require('../data');
var _ = require('lodash');
var Promise = require('bluebird');

const crud = require('../util/crud');

const table = 'message';
const columns = [ 'id', 'id_sensor', 'number', 'target', 'content' , 'created_at'];

module.exports = {
    get : function(id) {
        return crud.get(id, table, columns);
    },

    add : function(message){
        let m = _.pick(message, _.without(columns, 'created_at'));
        return crud.add(message, table, columns);
    },

    update : function(message) {
        return crud.update(message, table, columns);
    },

    find: function(filter){
        return crud.find(filter, table, columns);
    },

    delete : function(id) {
        return crud.delete(id, table);
    }
};
