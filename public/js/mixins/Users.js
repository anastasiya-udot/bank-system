import constants from '../../../common/constants';

module.exports = {
    data() {
        return {
            users: [],
            url: `${constants.TYPE}://${constants.HOST}:${constants.PORT}/users`
        }
    },
    methods: {
        getAllUsers() {
            this.$http.get(this.url).then(
                response => {
                    this.users = response.body;
                },
                response => {
                    console.log(response);
                }
            )
        }
    },
    created() {
        this.getAllUsers();
    }
}