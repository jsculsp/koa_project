/**
 * Created by linmu on 2017/6/7.
 */
const u = require('../utils')
const log = u.log

let fn_index = async (ctx, next) => {
    ctx.response.body = `
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>
    `
}

let fn_signin = async (ctx, next) => {
    let name = ctx.request.body.name || ''
    let password = ctx.request.body.password || ''
    log(`sign in with name: ${name}, password: ${password}`)
    if (name === 'koa' && password === '123456') {
        ctx.response.body = `<h1>Welcome, ${name}</h1>`
    } else {
        ctx.response.body = `<h1>Login failed</h1>`
    }
}

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin,
}