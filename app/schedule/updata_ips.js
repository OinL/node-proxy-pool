'use strict';

const Subscription = require('egg').Subscription;

class UpdataIps extends Subscription {
    static get schedule() {
        return {
            interval: '30m',
            type: 'all',
        };
    }

    async subscribe() {
        await this.ctx.service.ip.get66ipData();  //定期爬取
    }


}

module.exports = UpdataIps;