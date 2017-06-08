/**
 * Created by linmu on 2017/6/7.
 */
const path = require('path')
const mime = require('mime')
const fs = require('mz/fs')

let staticFiles = (url, dir) => {
    return async (ctx, next) => {
        let rpath = ctx.request.path
        if (rpath.startsWith(url)) {
            let fp = path.join(dir, rpath.substring(url.length))
            if (await fs.exists(fp)) {

            }
        }
    }
}