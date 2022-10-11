const {
    StatusCodes,
} = require('http-status-codes');

const Payment = require('../models/Payment.js');

const addPayment = async (req, res) => {

    const { userId, invoiceId, date, amount, paymentType, notes } = { ...req.query, ...req.params, ...req.body, ...req.user };

    if (!userId || !invoiceId || !date || !amount || !paymentType || notes === undefined) {

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                success: false,
                message: 'Missing Required Fields'
            });

    };

    try {

        const { result: payment } = await Payment.create({ userId, invoiceId, date, amount, paymentType, notes });

        return res
            .status(StatusCodes.CREATED)
            .json({
                success: true,
                message: 'addition successful',
                data: payment,
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

const getPayment = async (req, res) => {

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

        const { result: existingPayment } = await Payment.find({ filterBy: { userId, ...(invoiceId && { invoiceId }) }, type: 'many' });

        if (invoiceId && !existingPayment) {

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
                data: existingPayment
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

const updatePayment = async (req, res) => {

    const { userId, PaymentId, date, dueDate, tax, notes, items, currency, total, paid } = { ...req.query, ...req.params, ...req.body, ...req.user };

    if (!userId || !PaymentId || [date, dueDate, tax, notes, items, currency, total, paid].every((param) => param === undefined)) {

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                success: false,
                message: 'Missing Required Fields'
            });

    };

    try {

        const { result: existingPayment } = await Payment.find({ filterBy: { PaymentId } });

        if (!existingPayment) {

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

        const { result: Payment } = await Payment.findUpdate({ filterBy: { PaymentId }, update, options: { returnDocument: "after" } });

        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                message: 'update successful',
                data: Payment,
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

const deletePayment = async (req, res) => {

    const { userId, PaymentId } = { ...req.query, ...req.params, ...req.body, ...req.user };

    if (!userId || !PaymentId) {

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                success: false,
                message: 'Missing Required Fields'
            });

    };

    try {

        const { result: existingPayment } = await Payment.find({ filterBy: { PaymentId } });

        if (!existingPayment) {

            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    success: false,
                    message: 'NOT FOUND - Id'
                });

        };

        await Payment.deleteOne({ filterBy: { PaymentId } });

        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                message: 'delete successful',
                data: existingPayment
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
    addPayment,
    getPayment,
    updatePayment,
    deletePayment,
};