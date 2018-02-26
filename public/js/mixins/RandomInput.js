import constants from '../../../common/constants';

module.exports = {
    methods: {
        makeid() {
            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

            for (let i = 0; i < 10; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        },

        makeEmail() { 
            let strValues="abcdefg12345"; 
            let strEmail = ""; 
            let strTmp; 
            for (let i=0;i<10;i++) { 
                strTmp = strValues.charAt(Math.round(strValues.length*Math.random())); 
                strEmail = strEmail + strTmp; 
            } 
            strTmp = ""; 
            strEmail = strEmail + "@"; 
            for (let j=0; j<8; j++) { 
                strTmp = strValues.charAt(Math.round(strValues.length*Math.random())); 
                strEmail = strEmail + strTmp; 
            } 
            strEmail = strEmail + ".com" 
            return strEmail; 
        },

        makeIdNumber() {
            let text = '';
            let possible = '123456';

            text += possible.charAt(Math.floor(Math.random() * possible.length));

            possible = '0123456789';
            for (let i = 0; i < 6; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            possible = 'ABCEMH';
            text += possible.charAt(Math.floor(Math.random() * possible.length));

            possible = '0123456789';
            for (let i = 0; i < 3; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            possible = ['PB', 'GB', 'BA', 'BI'];
            text += possible[(Math.floor(Math.random() * possible.length))];

            possible = '0123456789';
            text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        },

        makeSerialNumber() {
            let text = '';
            let possible = '0123456789';

            text += this.makeSerialType();

            for (let i = 0; i < 7; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));


            return text;
        },

        makeSerialType() {
            let text = '';
            let possible = ['AB', 'BM', 'HB', 'KH', 'MP', 'MC', 'KB', 'PP', 'BM'];

            text += possible[(Math.floor(Math.random() * possible.length))];
            return text;
        },

        generateRandomValue(type, key) {
            if (key === 'email') {
                return this.makeEmail();
            }

            if (key === 'mobilePhoneNumber' || key === 'homePhoneNumber') {
                return Math.floor(Math.random() * 100000000000);
            }

            if (key === 'idNumber') {
                return this.makeIdNumber();
            }

            if (key === 'serialNumber') {
                return this.makeSerialNumber();
            }

            if (key === 'serialType') {
                return this.makeSerialType();
            }

            if (type === constants.USER_SCHEMA_TYPES.BOOLEAN) {
                return false;
            }

            if (type === constants.USER_SCHEMA_TYPES.STRING) {
                return this.makeid();
            }
        }
    }
};