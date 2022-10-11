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


const create = async ({ userId, customerId, date, dueDate, tax, items, total, notes, currency }) => {

    if (!userId || !customerId || !date || !dueDate || !items || !currency || total === undefined || tax === undefined || notes === undefined) throw new Error('Missing required fields to create invoice');

    try {

        const currentDate = moment().toDate()

        const preInvoice = {
            userId,
            customerId,
            invoiceId: randomString.generate(24),
            date: moment(new Date(date)).toDate(),
            dueDate: moment(new Date(dueDate)).toDate(),
            updatedAt: currentDate,
            createdAt: currentDate,
            items,
            tax: +tax || 0,
            total: +total || 0,
            notes,
            balance: +total || 0,
            currency,
            paid: 0,
        }

        await insertMany(INVOICES, [preInvoice]);

        const { userId: Id, ...invoice } = preInvoice;

        return ({
            error: false,
            result: invoice
        });


    } catch (error) {

        throw new Error(error);

    }
};

const find = async ({ filterBy, selectBy, sortBy, type = 'one', limit = 10, page = 1, skip = (+page - 1) * (+limit) }) => {

    if (!filterBy) throw new Error('filterBy is required for a find');

    try {
        const agg = [
            {
                $match: filterBy,
            },
            {
                $lookup: {
                    from: CUSTOMERS,
                    localField: 'customerId',
                    foreignField: 'customerId',
                    as: 'customer',
                }
            },
            {
                $unwind: '$customer'
            },
            {
                $lookup: {
                    from: PAYMENTS,
                    localField: 'invoiceId',
                    foreignField: 'invoiceId',
                    as: 'payments',
                }
            },
            {
                $sort: { createdAt: -1 }
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

        const { result } = await aggregateData(INVOICES, agg);

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

        await updateMany(INVOICES, filterBy, { $set: { ...update, updatedAt: moment().toDate() } }, options);

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

        const { result } = await deleteMany(INVOICES, filterBy);

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

        const { result: { value: { userId, ...customer } } } = await findAndUpdateData(INVOICES, filterBy, { $set: { ...update, updatedAt: moment().toDate() } }, options);

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