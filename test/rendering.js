var fs = require('fs');
var path = require('path');
var test = require('tape');
var postcss = require('postcss');
var styleGuide = require('postcss-style-guide');

test('rendering test: useing postcss-style-guide', function (t) {
    var opts = {
        name: 'Default theme',
        src: 'test/input.css',
        dest: 'test/dest/confirm/index.html',
        themePath: './'
    };
    var cwd = process.cwd();
    var src = path.resolve(cwd, 'test/input.css');
    var css = fs.readFileSync(src, 'utf-8');
    postcss([styleGuide(opts)])
      .process(css)
      .then(function () {
        var dest = path.resolve(cwd, 'test/dest/confirm/index.html');
        var actual = fs.readFileSync(dest, 'utf8');
        var expectedPath = path.resolve(cwd, 'test/output.html');
        var expected = fs.readFileSync(expectedPath, 'utf8');
        t.same(actual, expected);
        t.end();
      })
      .catch(function (err) {
        t.error(err)
        t.end();
      });
});

test.onFinish(function () {
    var cwd = process.cwd();
    var dest = path.resolve(cwd, 'test/dest');
    var recursiveDeleteDir = function(dest) {
        if(fs.existsSync(dest)) {
            fs.readdirSync(dest).forEach(function(file, index){
                var filePath = path.resolve(dest, file);
                if(fs.lstatSync(filePath).isDirectory()) {
                    recursiveDeleteDir(filePath);
                } else {
                    fs.unlinkSync(filePath);
                }
            });
            fs.rmdirSync(dest);
        }
    };
    recursiveDeleteDir(dest);
});