const mongoose = require('mongoose');
const { CONFIGS } = require('./configs');

const connect = async () => {
    const { username, password, host, port, name } = CONFIGS.db;
    let urlConnection

    if (username && password) {
        urlConnection = `mongodb://${username}:${password}@${host}:${port}`;
    } else {
        urlConnection = `mongodb://${host}:${port}`;
    }

    await mongoose.connect(urlConnection, {
        dbName: name
    }).then(() => console.log('Database Connected!')).catch(err => console.log(err));
}

exports.connect = connect;
