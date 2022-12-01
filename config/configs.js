require('dotenv').config();

const CONFIGS = {
    db: {
        host     : process.env.DB_HOST,
        port     : process.env.DB_PORT,
        username : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        name     : process.env.DB_NAME
    }
};

module.exports = { CONFIGS };