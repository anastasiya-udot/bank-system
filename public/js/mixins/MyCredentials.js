import mydata from '../../../sources/myData';

module.exports = {
    methods: {
        insertMyData(key) {
            return mydata[key];
        }
    }
};