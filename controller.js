/**
 * Created by linmu on 2017/6/6.
 */
const fs = require('fs')

const u = require('./utils')
const log = u.log

let apiGet = (url, router, mapping) => {
    let path = url.substring(4)
    router.get(path, mapping[url])
    log(`register URL mapping: GET ${path}`)
}

let apiPost = (url, router, mapping) => {
    let path = url.substring(5)
    router.post(path, mapping[url])
    log(`register URL mapping: POST ${path}`)
}

let apiPut = (url, router, mapping) => {
    let path = url.substring(4)
    router.put(path, mapping[url])
    log(`register URL mapping: PUT ${path}`)
}

let apiDelete = (url, router, mapping) => {
    let path = url.substring(7)
    router.del(path, mapping[url])
    log(`register URL mapping: DELETE ${path}`)
}

let apiOthers = (url, router, mapping) => {
    log(`invalid URL: ${url}`)
}

let addMapping = (router, mapping) => {
    let mapDict = {
        'GET ': apiGet,
        'POST ': apiPost,
        'PUT ': apiPut,
        'DELETE ': apiDelete,
        'OTHERWISE ': apiOthers,
    }
    for (let url in mapping) {
        for (let method in mapDict) {
            if (url.startsWith(method)) {
                let apiMethod = mapDict[method]
                apiMethod(url, router, mapping)
                break
            }
        }
    }
}

let addControllers = (router, dir) => {
    let fileAll = fs.readdirSync(`${__dirname}/${dir}`)
    let fileFiltered = fileAll.filter(f => f.endsWith('.js'))
    fileFiltered.forEach(f => {
        log(`process controller: ${f}...`)
        let mapping = require(`${__dirname}/${dir}/${f}`)
        addMapping(router, mapping)
    })
}

module.exports = (dir = 'controllers') => {
    let controllers_dir = dir
    let router = new require('koa-router')()
    addControllers(router, controllers_dir)
    return router.routes()
}