'use strict';

const Service = require('egg').Service;
const iconv = require('iconv-lite')
const rp = require('request-promise')

class IpService extends Service {
    async get66ipData(ipCount = 100) {
        const { ctx } = this;
        try {
            //抓取的页面地址
            const apiURL = `http://www.66ip.cn/nmtq.php?getnum=${ipCount}&isp=0&anonymoustype=0&start=&ports=&export=&ipaddress=&area=0&proxytype=2&api=66ip`

            //设置HTTP请求参数
            const options = {
                method: 'GET',
                url: apiURL,
                gzip: true,
                headers: {
                    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    'Accept-Encoding': 'gzip, deflate',
                    'Accept-Language': 'zh-CN,zh;q=0.9',
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
                    referer: 'http://www.66ip.cn/',
                    Cookie:
                        'yd_cookie=5fcce891-b4d1-4c49c5152516f6d57c2c9d80f72b9805bbfb',
                    Host: 'www.66ip.cn'
                }
            }
            //发送http请求
            let data = await rp(options)

            // 如果是 gbk ，则使用icnov 来转
            // node环境不支持 gbk,因此会乱码
            if (/meta.+charset=gbk/i.test(data)) {
                data = iconv.decode(data, 'gbk')
            }
            // 清洗出代理ip
            const proxyList = data.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,4}/g)

            // 把数据解析成约定的格式（数据库的格式）
            const newList = []
            proxyList.forEach(item => {
                newList.push({
                    ip: item.split(':')[0],
                    port: item.split(':')[1],
                    anonymous: '高匿',
                    source: 'http://www.66ip.cn/'
                })
            })
            proxyList.forEach(item => {
                this.ctx.model.IpPool.create({
                    ip: item.split(':')[0],
                    port: item.split(':')[1],
                    anonymous: '高匿',
                    source: 'http://www.66ip.cn/'
                })
            })

            return newList;
        } catch (error) {
            console.warn('get proxy list error ...')
            console.warn(error)
            return error;
        }
    }
}

module.exports = IpService;
