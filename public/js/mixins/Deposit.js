import config from '../../../common/config';

module.exports = {
    data() {
        return {
            depositUrl: `${config.TYPE}://${config.HOST}:${config.PORT}/deposit`
        }
    },
    methods: {
        getAllDepositPrograms() {
            return this.$http.get(`${this.depositUrl}/programs`);
        }
    }
}