/**
 * Created by linmu on 2017/6/7.
 */
const u = require('../utils')
const log = u.log

var fn_hello = async (ctx, next) => {
    let name = ctx.params.name
    ctx.response.body = `<h1>Hello, ${name}!</h1>`
}

module.exports = {
    'GET /hello/:name': fn_hello,
}