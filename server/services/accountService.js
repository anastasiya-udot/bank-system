const BaseService = require('./baseService');
const constants = require('../../common/constants');
const async = require('async');
const ServerError = require('../utils/serverError');
const currencies = require('../../sources/currencies');
const _ = require('lodash');

class AccountService extends BaseService{

    _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    constructor() {
        super();

        this._BdfAccount = {
            model: global.models.BdfAccount,
            code: constants.ACCOUNT_CODES.BDF,
            index: constants.ACCOUNT_TYPES.BDF
        };

        this._UserAccount = {
            model: global.models.UserAccount,
            code: constants.ACCOUNT_CODES.USER,
            index: constants.ACCOUNT_TYPES.USER
        };

        this._InterestAccount = {
            model: global.models.InterestAccount,
            code: constants.ACCOUNT_CODES.INTEREST,
            index: constants.ACCOUNT_TYPES.INTEREST
        };

        this._currentAccount = this._BdfAccount;
        this.Model = this._currentAccount.model;

        this.getAll(constants.ACCOUNT_TYPES.BDF, (err, models) => {
            if (err) {
                throw Error('Can\t get BDF account ID');
            } else if (!models.length) {
                throw Error('Please, add BDF account to DB and then restart server');
            }
            this._bdfId = models[0].id;
        })
    }

    _createNewAccount(agreement, name, next) {
        let data = {
            agreementId: agreement.id,
            number: `${this._currentAccount.code}${agreement.number}${this._getRandomInt(0, 10)}`,
            code: this._currentAccount.code,
            name: name,
            amount: 0,
            currency: agreement.currency,
            endDate: agreement.programEndDate instanceof Date ? agreement.programEndDate.valueOf() : (new Date(agreement.programEndDate)).valueOf()
        };

        let account = new this.Model(data);

        account.save(err => {
            if (err) {
                return next(new ServerError('Error during account creation', 500));
            }

            next(null, account);
        });
    }

    _createNewUserAccount(agreement, entryType, next) {
        this.Model = this._UserAccount.model;
        this._currentAccount = this._UserAccount;

        async.waterfall([
            next => global.serviceLocator.get('user').getById(agreement.userId, next),
            (user, next) => {
                let name = `${entryType === constants.ACCOUNT_ENTRY_TYPES.CREDIT ? 'Credit' : 'Deposit'}: ${user.surname} ${user.name}`;

                this._createNewAccount(agreement, name, next);
            }
        ], next)
    }

    _getBdf(next) {
        this._BdfAccount.model.findById(this._bdfId, next);
    }

    _convertCurrency(amount, currency) {
        let currencyItem = _.find(currencies, cur => {
            return cur.name === currency;
        });

        return amount * currencyItem.coefficient;
    }

    _addToAccount(account, sum, next) {

        account.amount += sum;

        account.save((err) => {
            if (err) {
                return next(new ServerError(`Can't add sum to account`), 500);
            }
            next();
        });
    }

    _deductFromAccount(account, sum, next) {
       
        account.amount -= sum;

        if (account.amount <= 0) {
            return next(new ServerError('Not enough money on account', 401));
        }

        account.save((err) => {
            if (err) {
                return next(new ServerError(`Can't deduct sum from account`), 500);
            }
            next();
        });
    }

    addSumToBDF(sum, currency, next) {
        async.waterfall([
            next => this._getBdf(next),
            (account, next) => this._addToAccount(account, this._convertCurrency(sum, currency), next)
        ], next);
    }

    removeSumFromBDF(sum, currency, next) {
        async.waterfall([
            next => this._getBdf(next),
            (account, next) => this._deductFromAccount(account, this._convertCurrency(sum, currency), next)
        ], next);
    }

    _createNewInterestAccount(agreement, entryType, next) {
        this.Model = this._InterestAccount.model;
        this._currentAccount = this._InterestAccount;

        async.waterfall([
            next => global.serviceLocator.get('user').getById(agreement.userId, next),
            (user, next) => {
                let name = `${entryType === constants.ACCOUNT_ENTRY_TYPES.CREDIT ? 'Credit' : 'Deposit'} Interest: ${user.surname} ${user.name}`;

                this._createNewAccount(agreement, name, next);
            }
        ], next);
    }

    createAccounts(agreement, entryType) {
        if (entryType === constants.ACCOUNT_ENTRY_TYPES.DEPOSIT) {
            async.waterfall([
                next => this._createNewInterestAccount(agreement, entryType, next),
                (interestAccount, next) => this._createNewUserAccount(agreement, entryType, next),
                (userAccount, next) => this.addSumToBDF(agreement.sum, agreement.currency, next)
            ]);
        } else {
            async.waterfall([
                next => this._createNewInterestAccount(agreement, entryType, next),
                (interestAccount, next) => this._createNewUserAccount(agreement, entryType, next),
                (userAccount, next) => this.removeSumFromBDF(agreement.sum, agreement.currency, err => {
                    if (err) {
                        return next(err);
                    }
                    next(null, userAccount);
                }),
                (userAccount, next) => this._addToAccount(userAccount, agreement.sum, next)
            ])
        }
    }

    deserialize(item) {
        let data = _.pick(item, ['agreementId', 'id', 'name', 'number', 'code', 'endDate', 'amount', 'currency'])
        return data;
    }

    _updateModel(type) {
        switch (type) {
            case constants.ACCOUNT_TYPES.BDF: this._currentAccount = this._BdfAccount; break;
            case constants.ACCOUNT_TYPES.INTEREST: this._currentAccount = this._InterestAccount; break;
            case constants.ACCOUNT_TYPES.USER: this._currentAccount = this._UserAccount; break;
        }

        this.Model = this._currentAccount.model;
    }

    getAll(type, next) {
        this._updateModel(type);
        super.getAll(next);
    }

    _iterateAgreements(type, agreements, next) {
        async.eachSeries(agreements, (agreement, next) => {
            this.getBy({ agreementId: agreement.id}, (err, accounts) => {
                if (err) {
                    return next(err);
                }

                if (!accounts.length) {
                    return next(new ServerError('No account found'), 500);
                }

                let service;

                if (type === constants.ACCOUNT_ENTRY_TYPES.CREDIT) {
                    service = global.serviceLocator.get('credits');
                } else {
                    service = global.serviceLocator.get('deposits');
                }

                service.getProgramById(agreement.accountEntryId, (err, program) => {
                    if (err) {
                        return next(err);
                    }

                    let interestRate = program.interestRate;

                    if ((new Date(agreement.programEndDate).valueOf()) <= (new Date().valueOf())) {
                       return next();
                    }
                    
                    let sum;

                    if (type === constants.ACCOUNT_ENTRY_TYPES.CREDIT) {
                        sum = this._convertCurrency(interestRate * agreement.sum / 365, agreement.currency);
                        this._addToAccount(accounts[0], sum, next);
                    } else {
                        sum = interestRate * agreement.sum / 365;

                        this.removeSumFromBDF(sum, agreement.currency, (err) => {
                            if (err) {
                                return next(err);
                            }

                            this._addToAccount(accounts[0], sum, next);
                        });
                    }
                });
            });
        }, next);
    }

    updateInterestAccounts(next) {
        let agreementsService = global.serviceLocator.get('agreements');

        this.Model = this._InterestAccount.model;

        async.waterfall([
            next => agreementsService.getAllAgreements(constants.ACCOUNT_ENTRY_TYPES.CREDIT, (err, agreements) => {
                if (err) {
                    return next(err);
                }

                this._iterateAgreements(constants.ACCOUNT_ENTRY_TYPES.CREDIT, agreements, next);
            }),
            next => agreementsService.getAllAgreements(constants.ACCOUNT_ENTRY_TYPES.DEPOSIT, (err, agreements) => {
                if (err) {
                    return next(err);
                }

                this._iterateAgreements(constants.ACCOUNT_ENTRY_TYPES.DEPOSIT, agreements, next);
            }),
        ], next)
    }

    updateAccounts(type, next) {
        this.updateInterestAccounts(err => {
            if (err) {
                return next(err);
            }

            this.getAll(type, next);
        });
    }

}

AccountService.serviceName = 'accounts';

module.exports = AccountService;