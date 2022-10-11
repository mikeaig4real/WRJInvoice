const {
    StatusCodes,
} = require('http-status-codes');

const {
    createJWT,
    isTokenValid,
    createTokenUser,
} = require('../utils');

const User = require('../models/User');

const auth = async (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer')) {

        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({
                success: false,
                message: 'UNAUTHORIZED',
            });

    };

    const token = authorization.split(' ')[1];

    try {

        const { result: existingToken } = await User.find({ filterBy: { token } });

        if (!existingToken) {
            
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({
                    success: false,
                    message: 'INVALID TOKEN',
                });
            
        }

        const decoded = isTokenValid(token);

        if (!decoded) {

            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({
                    success: false,
                    message: 'INVALID TOKEN',
                });

        };

        const { iat, exp, ...user } = decoded;

        req.user = user;

        next();

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
    auth,
}