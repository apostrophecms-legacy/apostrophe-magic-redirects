/* jshint node:true */

var async = require('async');
var qs = require('qs');

module.exports = magicRedirects;

function magicRedirects(options, callback) {
  return new magicRedirects.Construct(options, callback);
}

magicRedirects.Construct = function(options, callback) {
  var self = this;

  self._apos = options.apos;
  self._app = options.app;
  self._options = options;
  self._pages = options.pages;

  self.redirects = self._apos.redirects;

  // apostrophe-site will automatically notice
  // we have a notfound handler

  self.setBridge = function(modules) {
    self._bridge = modules;
  };

  self.notfound = function(req, finalCallback) {
    if (options.filter) {
      if (!req.url.match(options.filter)) {
        return setImmediate(finalCallback);
      }
    }
    if (options.notFilter) {
      if (req.url.match(options.notFilter)) {
        return setImmediate(finalCallback);
      }
    }
    return async.series({
      // Try the redirects table before we get too clever
      redirects: function(callback) {
        return self._apos.redirects.findOne({ from: req.url }, function(err, redirect) {
          if (err || (!redirect)) {
            return callback(null);
          }
          if (redirect.to !== req.url) {
            req.redirect = redirect.to;
            // Skip the rest, we're done!
            return finalCallback(null);
          }
          return callback(null);
        });
      },
      search: function(callback) {
        var url = req.url;
        // Don't let numbers in slugs get in the way
        // of a match
        url = url.replace(/[\d]+/g, '');
        var words = url.split(/[\/\-]+/);
        var criteria = {};

        // Respect the unsearchable types list
        var unsearchable = self._bridge['apostrophe-search'].unsearchable;
        if (unsearchable.length) {
          criteria = {
            type: { $nin: unsearchable }
          };
        }

        // Best search match is our redirect target
        return self._apos.getOne(req, criteria, { search: words.join(' '), limit: 1, fields: { slug: 1 } }, function(err, page) {
          if (err) {
            // An error from a 404 fallback mechanism
            // is not a fatal error
            return callback(null);
          }
          if (!page) {
            return callback(null);
          }
          if (!page.slug.match(/^\//)) {
            // Let the search module figure out how
            // to get us to snippets
            req.redirect = '/apos-search/search-result?' + qs.stringify({ slug: page.slug });
          }
          req.redirect = page.slug;
          return callback(null);
        });
      }
    }, finalCallback);
  };

  if (callback) {
    // Invoke callback on next tick so that the constructor's return
    // value can be assigned to a variable in the same closure where
    // the callback resides
    process.nextTick(function() { return callback(null); });
  }
};
