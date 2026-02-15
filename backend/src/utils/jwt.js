const jwt = require('jsonwebtoken');

const generateToken = (userId, role) => {
    return jwt.sign({ userId, role }, process.env.JWT_SECRET || 'your_super_secret_key', {
        expiresIn: '1d',
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_key');
};

module.exports = {
    generateToken,
    verifyToken,
};
