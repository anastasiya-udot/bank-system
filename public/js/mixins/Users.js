import config from '../../../common/config';

module.exports = {
    data() {
        return {
            url: `${config.TYPE}://${config.HOST}:${config.PORT}/users`
        }
    },
    methods: {
        getAllUsers() {
            return this.$http.get(this.url);
        },

        createUser(data) {
            return this.$http.post(this.url, data);
        },

        updateUser(user, data) {
            return this.$http.put(`${this.url}/${user.id}`, data);
        },

        removeUser(user) {
            return this.$http.delete(`${this.url}/${user.id}`);
        }
    }
}