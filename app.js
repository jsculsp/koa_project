/**
 * Created by linmu on 2017/6/6.
 */

'use strict'
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const u = require('./utils')
const controller= require('./controller')

const app = new Koa()
const log = u.log

app.use(async (ctx, next) => {
    log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next()
})

app.use(bodyParser())

app.use(controller())

app.listen(3000)
log('app started at port 3000...')