module.exports = {

    name: function(value) {
        let regexp = new RegExp(/^[a-z0-9_-]{3,15}$/);

        return regexp.test(value)
    },

    email: function(value) {
        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        return regexp.test(value)
    },

    phone: function(value) {
        let regexp = new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/);

        return regexp.test(value);
    }
};