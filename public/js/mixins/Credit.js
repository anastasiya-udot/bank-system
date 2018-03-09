import config from '../../../common/config';

module.exports = {
    data() {
        return {
            creditUrl: `${config.TYPE}://${config.HOST}:${config.PORT}/credit`
        }
    },
    methods: {
        getAllCreditPrograms() {
            return this.$http.get(`${this.creditUrl}/programs`);
        }
    }
}