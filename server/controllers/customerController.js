const {
    StatusCodes,
} = require('http-status-codes');

const Customer = require('../models/Customer.js');

const {
    createJWT,
    isTokenValid,
    createTokenUser,
} = require('../utils');

const addCustomer = async (req, res) => {

    const { userId, firstName, lastName, phone, email, address } = { ...req.query, ...req.params, ...req.body, ...req.user };

    if (!firstName || !lastName || !phone || !email || !userId || !address) {

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                success: false,
                message: 'Missing Required Fields'
            });

    };

    try {

        const { result: existingCustomer } = await Customer.find({ filterBy: { email } });

        if (existingCustomer) {

            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    success: false,
                    message: 'Customer with credential already exists'
                });

        };

        const { result: customer } = await Customer.create({ firstName, lastName, phone, email, userId, address });

        return res
            .status(StatusCodes.CREATED)
            .json({
                success: true,
                message: 'addition successful',
                data: customer,
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

const getCustomer = async (req, res) => {

    const { userId, customerId } = { ...req.query, ...req.params, ...req.body, ...req.user };

    if (!userId) {

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                success: false,
                message: 'Missing Required Fields'
            });

    };

    try {

        const { result: existingCustomer } = await Customer.find({ filterBy: { userId, ...(customerId && { customerId }) }, type: customerId ? 'one' : 'many' });

        if (customerId && !existingCustomer) {

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
                data: existingCustomer
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

const updateCustomer = async (req, res) => {

    const { userId, customerId, firstName, lastName, phone, email } = { ...req.query, ...req.params, ...req.body, ...req.user };

    if (!userId || !customerId || [firstName, lastName, phone, email].every((param) => !param)) {

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                success: false,
                message: 'Missing Required Fields'
            });

    };

    try {

        const { result: existingCustomer } = await Customer.find({ filterBy: { customerId } });

        if (!existingCustomer) {

            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    success: false,
                    message: 'NOT FOUND - Id'
                });

        };

        const [prevFirstName, prevLastName] = existingCustomer.fullName.split(' ');

        const update = {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(phone && { phone }),
            ...(email && { email }),
            ...((firstName || lastName) && { fullName: `${firstName ? firstName : prevFirstName} ${lastName ? lastName : prevLastName}` }),
        }

        const { result: customer } = await Customer.findUpdate({ filterBy: { userId }, update, options: { returnDocument: "after" } });

        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                message: 'update successful',
                data: customer,
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

const deleteCustomer = async (req, res) => {

    const { userId, customerId } = { ...req.query, ...req.params, ...req.body, ...req.user };

    if (!userId || !customerId) {

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                success: false,
                message: 'Missing Required Fields'
            });

    };

    try {

        const { result: existingCustomer } = await Customer.find({ filterBy: { customerId } });

        if (!existingCustomer) {

            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    success: false,
                    message: 'NOT FOUND - Id'
                });

        };

        await Customer.deleteOne({ filterBy: { customerId } });

        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                message: 'delete successful',
                data: existingCustomer
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
    addCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer,
};