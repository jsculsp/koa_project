/**
 * Created by linmu on 2017/6/7.
 */
const log = require('../utils').log

let signin = async (ctx, next) => {
    let email = ctx.request.body.email || ''
    let password = ctx.request.body.password || ''
    if (email === 'linmu@fuwo.com' && password === '123456') {
        log('signin OK!')
        let params = {
            title: 'Sign In OK',
            name: 'Linmu',
        }
        ctx.render('signin-ok.html', params)
    } else {
        log('signin Failed!')
        let params = {
            title: 'Sign In Failed',
        }
        ctx.render('signin-failed.html', params)
    }
}

module.exports = {
    'POST /signin': signin,
}