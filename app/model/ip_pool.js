'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const conn = app.mongooseDB.get('back');

    const IpSchema = new Schema({
        ip: {
            type: String,
            unique: true,
        },
        port: {
            type: String,
        },
        anonymous: {
            type: String,
        },
        source: {
            type: String,
        },
    });
    return conn.model('Ip', IpSchema);
};
