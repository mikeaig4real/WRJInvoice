const {
    StatusCodes,
} = require('http-status-codes');

const bcrypt = require('bcryptjs');

const User = require('../models/User');

const {
    createJWT,
    isTokenValid,
    createTokenUser,
} = require('../utils');


const register = async (req, res) => {

    try {

        const { firstName, lastName, email, password } = { ...req.query, ...req.params, ...req.body };

        if (!firstName || !lastName || !password || !email) {

            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    success: false,
                    message: 'Missing Required Fields'
                });

        };

        const { result: existingUser } = await User.find({ filterBy: { email } });

        if (existingUser) {

            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    success: false,
                    message: 'User with credential already exists'
                });

        };

        const { result: user } = await User.create({ firstName, lastName, password, email });

        return res
            .status(StatusCodes.CREATED)
            .json({
                success: true,
                message: 'register successful',
                data: user,
            });

    } catch (error) {

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                success: false,
                message: error.message,
            });
    };

};

const login = async (req, res) => {

    try {

        const { email, password } = { ...req.query, ...req.params, ...req.body };

        if (!password || !email) {

            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    success: false,
                    message: 'Missing Required Fields'
                });

        };

        const { result: existingUser } = await User.find({ filterBy: { email } });

        if (!existingUser) {

            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({
                    success: false,
                    message: 'Invalid Credentials - Email'
                });

        };

        const { password: existingUserPassword, ...user } = existingUser;

        const isMatch = await bcrypt.compare(password, existingUserPassword);

        if (!isMatch) {

            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({
                    success: false,
                    message: 'Invalid Credentials - Password'
                });

        };

        const token = createJWT({ payload: createTokenUser(existingUser), expiresIn: '24h' });

        await User.update({ filterBy: { email }, update: { token } });

        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                message: 'login successful',
                data: {
                    ...user,
                    token,
                }
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


const updateProfile = async (req, res) => {

    try {

        const { phone, businessName, address, etc, userId } = { ...req.query, ...req.params, ...req.body, ...req.user };

        if ([phone, businessName, address, etc].every((param) => !param)) {

            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    success: false,
                    message: 'Missing Required Fields'
                });

        };

        const update = {
            ...(phone && { phone }),
            ...(businessName && { businessName }),
            ...(address && { address }),
            ...(etc && { etc }),
        };

        const { result: user } = await User.findUpdate({ filterBy: { userId }, update, options: { returnDocument: "after" } });

        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                message: 'update successful',
                data: user,
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









module.exports = {
    register,
    login,
    updateProfile,
}