/**
 * Created by linmu on 2017/6/6.
 */

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const u = require('./utils')
const controller= require('./controller')
const templating = require('./templating')
const app = new Koa()
const log = u.log
const isProduction = process.env.NODE_ENV === 'production'

app.use(async (ctx, next) => {
    log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    let start = new Date().getTime()
    await next()
    let end = new Date().getTime()
    let execTime = end - start
    ctx.response.set('X-Response-Time', `${execTime}ms`)
})

if (!isProduction) {
    let staticFiles = require('./static_files')
    app.use(staticFiles('/static/', `${__dirname}/static`))
}

app.use(bodyParser())

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction,
}))

app.use(controller())

app.listen(3000)
log('app started at port 3000...')