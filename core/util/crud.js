const   qb      = require('../data'),
        _       = require('lodash'),
        Promise = require('bluebird');

// TODO: Catch & handle database errors
module.exports = {
    get : function(id, table, columns) {
        const query = qb.select(columns).from(table).where('id', id);

        return query
        .then(_.head)
    },

    add : function(object, table, columns){
        const query = qb(table).insert(object).into(table)

        return query
        .then(id => {
            return this.get(id, table, columns)
        });
    },

    update : function(object, table, columns) {
        const query = qb(table).update(object).where('id', object['id'])

        return query
        // .then(status => {
        //     if(status === 1) return this.get(object['id'], table, column);
        //     if(status === 0) return Promise.reject(new Error("Error updating object"));
        // });
    },

    find: function(filter, table, columns){
        var query = qb.select(columns).from(table);

        // filters by every property
        for (var key in filter) {
            if (filter.hasOwnProperty(key)) query.where(key, '=', filter[key])
        }

        return query;
    },

    delete : function(id, table) {
        const query = qb(table).where('id', id).del();

        return query
    }
};
