const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

exports.generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.ST_USUARIO
    };

    return jwt.sign(payload, secretKey, { expiresIn: '24h' });
};

exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
};
