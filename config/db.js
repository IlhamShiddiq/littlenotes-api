const mongoose = require('mongoose');
const { CONFIGS } = require('./configs');

const connect = async () => {
    const dbConfig = CONFIGS.db;
    await mongoose.connect(`mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}`, {
        dbName: dbConfig.name
    }).then(() => console.log('Database Connected!')).catch(err => console.log(err));
}

exports.connect = connect;
