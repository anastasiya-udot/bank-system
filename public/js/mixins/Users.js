import config from '../../../common/config';

module.exports = {
    data() {
        return {
            users: [],
            url: `${config.TYPE}://${config.HOST}:${config.PORT}/users`
        }
    },
    methods: {
        getAllUsers() {
            return this.$http.get(this.url);
        }
    },
    created() {
        this.getAllUsers().then(
            response => {
                this.users = response.body;
            },
            err => {
                console.log(err);
            }
        )
    }
}