const {
    StatusCodes,
} = require('http-status-codes');

const Invoice = require('../models/Invoice.js');

const addInvoice = async (req, res) => {

    const { userId, customerId, date, dueDate, tax, notes, items, currency, total } = { ...req.query, ...req.params, ...req.body, ...req.user };

    if (!userId || !customerId || !date || !dueDate || tax === undefined || notes === undefined || (!items || !Array.isArray(items)) || !currency || total === undefined) {

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                success: false,
                message: 'Missing Required Fields'
            });

    };

    try {

        const { result: invoice } = await Invoice.create({ userId, customerId, date, dueDate, tax, notes, items, currency, total });

        return res
            .status(StatusCodes.CREATED)
            .json({
                success: true,
                message: 'addition successful',
                data: invoice,
            });

    } catch (error) {

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                success: false,
                message: error.message,
            });

    }

}

const getInvoice = async (req, res) => {

    const { userId, invoiceId } = { ...req.query, ...req.params, ...req.body, ...req.user };

    if (!userId) {

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                success: false,
                message: 'Missing Required Fields'
            });

    };

    try {

        const { result: existingInvoice } = await Invoice.find({ filterBy: { userId, ...(invoiceId && { invoiceId }) }, type: invoiceId ? 'one' : 'many' });

        if (invoiceId && !existingInvoice) {

            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    success: false,
                    message: 'NOT FOUND - Id'
                });

        };

        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                message: 'get successful',
                data: existingInvoice
            });

    } catch (error) {

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                success: false,
                message: error.message,
            });

    }

};

const updateInvoice = async (req, res) => {

    const { userId, invoiceId, date, dueDate, tax, notes, items, currency, total, paid } = { ...req.query, ...req.params, ...req.body, ...req.user };

    if (!userId || !invoiceId || [date, dueDate, tax, notes, items, currency, total, paid].every((param) => param === undefined)) {

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                success: false,
                message: 'Missing Required Fields'
            });

    };

    try {

        const { result: existingInvoice } = await Invoice.find({ filterBy: { invoiceId } });

        if (!existingInvoice) {

            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    success: false,
                    message: 'NOT FOUND - Id'
                });

        };

        // date, dueDate, tax, notes, items, currency, total

        const update = {
            ...(date && { date: new Date(date) }),
            ...(dueDate && { dueDate: new Date(dueDate) }),
            ...(tax !== undefined && { tax }),
            ...(notes && { notes }),
            ...(items && { items }),
            ...(currency && { currency }),
            ...(total !== undefined && { total }),
            ...(paid !== undefined && { paid }),
        }

        const { result: invoice } = await Invoice.findUpdate({ filterBy: { invoiceId }, update, options: { returnDocument: "after" } });

        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                message: 'update successful',
                data: invoice,
            });

    } catch (error) {

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                success: false,
                message: error.message,
            });

    }

}

const deleteInvoice = async (req, res) => {

    const { userId, invoiceId } = { ...req.query, ...req.params, ...req.body, ...req.user };

    if (!userId || !invoiceId) {

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                success: false,
                message: 'Missing Required Fields'
            });

    };

    try {

        const { result: existingInvoice } = await Invoice.find({ filterBy: { invoiceId } });

        if (!existingInvoice) {

            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    success: false,
                    message: 'NOT FOUND - Id'
                });

        };

        await Invoice.deleteOne({ filterBy: { invoiceId } });

        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                message: 'delete successful',
                data: existingInvoice
            });

    } catch (error) {

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                success: false,
                message: error.message,
            });

    }

}



module.exports = {
    addInvoice,
    getInvoice,
    updateInvoice,
    deleteInvoice,
};