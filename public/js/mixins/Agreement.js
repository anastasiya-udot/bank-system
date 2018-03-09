import config from '../../../common/config';
import constants from '../../../common/constants';

module.exports = {
    data() {
        return {
            agreementUrl: `${config.TYPE}://${config.HOST}:${config.PORT}/agreement`
        }
    },
    methods: {
        getAllAgreements() {
            return this.$http.get(`${this.agreementUrl}`);
        },

        getAgreements(type) {
            if (type === constants.ACCOUNT_ENTRY_TYPES.CREDIT) {
                return this.$http.get(`${this.agreementUrl}/credits`);
            } else {
                return this.$http.get(`${this.agreementUrl}/deposits`);
            }
        },
        postNewAgreement(type, agreement) {
            if (type === constants.ACCOUNT_ENTRY_TYPES.CREDIT) {
                return this.$http.post(`${this.agreementUrl}/credits`, agreement);
            } else {
                return this.$http.post(`${this.agreementUrl}/deposits`, agreement);
            }
        }
    },
};