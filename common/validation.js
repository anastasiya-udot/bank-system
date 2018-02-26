let _ = require('lodash');

module.exports = {

    name: function(value) {
        let regexp = new RegExp(/^[a-zA-Z_-]{2,15}$/);

        return regexp.test(value)
    },

    email: function(value) {
        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        return regexp.test(value)
    },

    phone: function(value) {
        let regexp = new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/);

        return regexp.test(value);
    },

    number: function(value) {
        let number = +value;
        
        return _.isNumber(number) && !_.isNaN(number);
    },

    idNumber: function(value) {
        let regexp = new RegExp(/^[1-6]{1}\d{6}[ABCEMHK]{1}\d{3}(PB|GB|BA|BI)\d$/);

        return regexp.test(value);
    },

    serialNumber: function(value) {
        let regexp = new RegExp(/^(AB|BM|HB|KH|MP|MC|KB|PP|BM)\d{7}$/);

        return regexp.test(value);
    },

    serialType: function(value) {
        let regexp = new RegExp(/^(AB|BM|HB|KH|MP|MC|KB|PP|BM)$/);

        return regexp.test(value);
    }
};