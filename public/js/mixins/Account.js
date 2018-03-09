import config from '../../../common/config';
import constants from '../../../common/constants';

module.exports = {
    data() {
        return {
            accountUrl: `${config.TYPE}://${config.HOST}:${config.PORT}/account`
        }
    },
    methods: {
        getAccounts(type) {
            return this.$http.get(`${this.accountUrl}/${type}`);
        },

        setEndDay(type) {
            return this.$http.put(`${this.accountUrl}/${type}`);
        },
    }
}