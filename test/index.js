var fs = require('fs')
var test = require('tape')

test('exists template.ejs', function (t) {
    var actual = fs.existsSync('template.ejs')

    t.same(actual, true)
    t.end()
})

test('exists style.css', function (t) {
    var actual = fs.existsSync('style.css')

    t.same(actual, true)
    t.end()
})
