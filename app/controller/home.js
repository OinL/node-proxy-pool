'use strict';

const Controller = require('egg').Controller;


class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('index.html');
  }
  async get66ip(){
    const { ctx } = this;
    ctx.body = await ctx.service.ip.get66ipData();
  }
}

module.exports = HomeController;
