/**
 * Created by linmu on 2017/5/22.
 */

var log = console.log.bind(console)

var e = function (selector) {
    return document.querySelector(selector)
}

Array.prototype.contains = function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

var ensureArrayEquals = function (arr1, arr2, message) {
    if (arr1.length !== arr2.length) {
        log(`测试失败！ ${message}`)
    } else {
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                log(`测试失败！ ${message}`)
            }
        }
    }
}

var ensure = function (condition, message) {
    // 在条件不成立的时候, 输出 message
    if(!condition) {
        log('*** 测试失败 ', message)
    }
}

var ensureEqual = function (a, b, message) {
    if (a != b) {
        log(`*** 测试失败, ${a} 不等于 ${b}, ${message}`)
    }
}

var arrayEqual = function (arr1, arr2, message) {
    if (arr1.length !== arr2.length) {
        return false
    } else {
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false
            }
        }
        return true
    }
}

// es 返回一个数组, 包含所有被选中的元素
var es = function (sel) {
    return document.querySelectorAll(sel)
}

// 切换一个元素的 class
var toggleClass = function (element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var appendHtml = function (element, html) {
	element.insertAdjacentHTML('beforeend', html)
}

var bindEvent = function (element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var removeClassAll = function (className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

var removeClassAllBySelector = function (selector) {
    var elements = document.querySelectorAll(selector)
    var all = selector.split('.')
    var cls = all[all.length - 1]
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(cls)
    }
}

var bindAll = function (selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var find = function (element, selector) {
    return element.querySelector(selector)
}

var closestClass = function (element, className) {
    var e = element
    while (e !== null) {
        if (e.classList.contains(className)) {
            return e
        } else {
            e = e.parentElement
        }
    }
    return null
}

var closestId = function (element, idName) {
    var e = element
    while (e !== null) {
        if (e.id === idName) {
            return e
        } else {
            e = e.parentElement
        }
    }
    return null
}

var closestTag = function (element, tagName) {
    var e = element
    while (e !== null) {
        if (e.tagName.toUpperCase() === tagName.toUpperCase()) {
            return e
        } else {
            e = e.parentElement
        }
    }
    return null
}

var closest = function (element, selector) {
    var flag = selector[0]
    if (flag === '.') {
        var className = selector.slice(1)
        return closestClass(element, className)
    } else if (flag === '#') {
        var idName = selector.slice(1)
        return closestId(element, idName)
    } else {
        var tag = selector
        return closestTag(element, tag)
    }
}

var ajax = function(method, path, data, reseponseCallback) {
    var r = new XMLHttpRequest()
    if (method === 'GET') {
        var encodedPara = serialize(data)
        path = `${path}?${encodedPara}`
    } else {
        var jsonData = serialize(data)
    }
    // 设置请求方法和请求地址
    r.open(method, path, true)
    // 设置发送的数据的格式
    r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    // 注册响应函数
    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            var responseParsed = JSON.parse(r.response)
            reseponseCallback(responseParsed)
        }
    }
    r.send(jsonData)
}

var serialize = function (obj) {
  var arr = []
  for (var p of obj) {
     arr.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
  }
  return arr.join("&")
}

var extend = function (Child, Parent) {
    var F = () => {}
    F.prototype = Parent.prototype
    Child.prototype = new F()
    Child.prototype.constructor = Child
    Child.uber = Parent.prototype
}

var extend2 = function (Child, Parent) {
    var p = Parent.prototype
    var c = Child.prototype
    for (let i in p) {
        c[i] = p[i]
    }
    c.uber = p
}

module.exports = {
    log: log,
    e: e,
    ensureArrayEquals: ensureArrayEquals,
    ensure: ensure,
    ensureEqual: ensureEqual,
    arrayEqual: arrayEqual,
    es: es,
    toggleClass: toggleClass,
    appendHtml: appendHtml,
    bindEvent: bindEvent,
    removeClassAll: removeClassAll,
    removeClassAllBySelector: removeClassAllBySelector,
    bindAll: bindAll,
    find: find,
    closest: closest,
    ajax: ajax,
    extend: extend,
    extend2: extend2,
}
