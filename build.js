var Handlebars = require('handlebars');
var Metalsmith = require('metalsmith');
var date = require('metalsmith-date-in-filename');
var paths = require('metalsmith-paths');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var layouts = require('metalsmith-layouts');
var pagination = require('metalsmith-pagination');
var assets = require('metalsmith-assets');

Handlebars.registerHelper('each-reverse', require('diy-handlebars-helpers/lib/each-reverse'));

Metalsmith(__dirname)
  .source('posts')
  .metadata({
    title: 'Animations',
    baseurl: '/animations'
  })
  .use(date({
    override: true
  }))
  .use(paths({
    property: 'paths'
  }))
  .use(collections({
    posts: '**'
  }))
  .use(function (files, metalsmith, done) {
    Object.keys(files).forEach(function (name) {
      if (/\.glsl$/.test(name)) {
        var data = files[name];
        data.layout = 'glsl.html';
        delete files[name];
        files[name.replace(/\.glsl$/, '.html')] = data;
      }
    });
    done();
  })
  .use(permalinks({
    pattern: ':date',
    date: 'YYYY-MM-DD'
  }))
  .use(pagination({
    posts: {
      perPage: 100,
      path: ':num',
      layout: 'index.html',
      first: 'index.html',
      noPageOne: true
    }
  }))
  .use(layouts({
    engine: 'handlebars',
    default: 'default.html'
  }))
  .use(assets({
    source: 'assets',
    destination: '.'
  }))
  .build(function (err) {
    if (err) throw err;
  });
