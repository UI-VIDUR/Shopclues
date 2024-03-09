require('dotenv').config();

module.exports = {
    PORT : process.env.PORT || 3002,
    secretKey : process.env.secretKey
}