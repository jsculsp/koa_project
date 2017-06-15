/**
 * Created by linmu on 2017/6/7.
 */
const u = require('../utils')
const log = u.log

const index = async (ctx, next) => {
    let params = {
        title: 'Welcome',
    }
    ctx.render('index.html', params)
}

module.exports = {
    'GET /': index,
}