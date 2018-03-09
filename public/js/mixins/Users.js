import config from '../../../common/config';

module.exports = {
    data() {
        return {
            userUrl: `${config.TYPE}://${config.HOST}:${config.PORT}/users`
        }
    },
    methods: {
        getAllUsers() {
            return this.$http.get(this.userUrl);
        },

        createUser(data) {
            return this.$http.post(this.userUrl, data);
        },

        updateUser(user, data) {
            return this.$http.put(`${this.userUrl}/${user.id}`, data);
        },

        removeUser(user) {
            return this.$http.delete(`${this.userUrl}/${user.id}`);
        }
    }
}