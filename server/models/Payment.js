const randomString = require('randomString');

const moment = require('moment-timezone');

const {
    updateMany,
    deleteMany,
    aggregateData,
    insertMany,
    findAndUpdateData,
} = require('../dbInstance').getDB();

const {
    INVOICES,
    CUSTOMERS,
    PAYMENTS,
} = require('../db/collections');


const create = async ({ userId, invoiceId, date, amount, paymentType, notes }) => {

    if (!userId || !invoiceId || !date || amount === undefined || paymentType === undefined || notes === undefined) throw new Error('Missing required fields to create invoice');

    try {

        const currentDate = moment().toDate();

        const prePayment = {
            userId,
            invoiceId,
            date: moment(new Date(date)).toDate(),
            createdAt: currentDate,
            amount: +amount || 0,
            notes,
        }

        await insertMany(PAYMENTS, [prePayment]);

        const { userId: Id, ...payment } = prePayment;

        return ({
            error: false,
            result: payment
        });


    } catch (error) {

        throw new Error(error);

    }
};

const find = async ({ filterBy, selectBy, sortBy, type = 'one', limit = 10, page = 1, skip = (page - 1) * limit }) => {

    if (!filterBy) throw new Error('filterBy is required for a find');

    try {

        const agg = [
            {
                $match: filterBy,
            },
            {
                $lookup: {
                    from: INVOICES,
                    localField: 'invoiceId',
                    foreignField: 'invoiceId',
                    as: 'invoice',
                }
            },
            {
                $unwind: '$invoice'
            },
            {
                $lookup: {
                    from: CUSTOMERS,
                    localField: 'invoice.customerId',
                    foreignField: 'customerId',
                    as: 'customer',
                }
            },
            {
                $unwind: '$customer'
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $skip: skip
            },
            {
                $limit: +limit
            }
        ];

        const { result } = await aggregateData(PAYMENTS, agg);

        return {
            error: false,
            result: type === 'one' ? result[0] : result,
        };

    } catch (error) {

        throw new Error(error);

    }
};

const update = async ({ filterBy, update, options = {} }) => {

    if (!filterBy || !update || !Object.keys(update)) throw new Error('filterBy and update with valid key is required');

    try {

        await updateMany(PAYMENTS, filterBy, { $set: { ...update, updatedAt: moment().toDate() } }, options);

        return {
            error: false,
            result: update,
        };

    } catch (error) {

        throw new Error(error);

    }

};

const deleteOne = async ({ filterBy }) => {

    if (!filterBy) throw new Error('filterBy is required');

    try {

        const { result } = await deleteMany(PAYMENTS, filterBy);

        return {
            error: false,
            result,
        };

    } catch (error) {

        throw new Error(error);

    }

};

const findUpdate = async ({ filterBy, update, options = {} }) => {

    if (!filterBy || !update || !Object.keys(update)) throw new Error('filterBy and update with valid key is required');

    try {

        const { result: { value: { userId, ...customer } } } = await findAndUpdateData(PAYMENTS, filterBy, { $set: { ...update, updatedAt: moment().toDate() } }, options);

        return {
            error: false,
            result: customer,
        };

    } catch (error) {

        throw new Error(error);

    }

};


module.exports = {
    create,
    find,
    update,
    findUpdate,
    deleteOne,
}