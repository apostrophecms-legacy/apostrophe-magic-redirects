# apostrophe-magic-redirects

As a last-ditch effort before issuing a 404, this module automatically issues redirects to the best match found via Apostrophe's [search module](http://github.com/punkave/apostrophe-search). Very helpful when recreating a large site with all-new content and new URLs.

This is very magical, and while it works well it will no doubt surprise you with the wrong result sometimes. If that happens a lot, use the [apostrophe-redirects module](https://github.com/punkave/apostrophe-redirects) to set up a better redirect manually.

**Table of Contents**

* [Installation](#installation)

* [Configuration](#configuration)

* [Usage](#usage)

## Installation

First make sure you have an [Apostrophe project](http://apostrophenow.org)!

Then:

    npm install --save apostrophe-magic-redirects

## Configuration

In `app.js`, add the module to your configuration:

    ... other modules ...
    'apostrophe-magic-redirects': { }

That's it!

### Too much magic?

Sometimes, this module can feel a little bit too magical. A redirect to a page of little relevance can be disconcerting. If you wish,  you can redirect only URLs that match a certain regular expression. For instance, this rule matches only URLs that look like dates:

    ... other modules ...
    'apostrophe-magic-redirects': {
      filter: /\d\d\d\d\-\d\d\-\d\d/
    }

You can also tell the module *not* to consider URLs that match a regular expression:

    ... other modules ...
    'apostrophe-magic-redirects': {
      notFilter: /\d\d\d\d\-\d\d\-\d\d/
    }

You may also use both options together.

## Usage

Try visiting various URLs that formerly 404'd on your site. For instance, if "Biology" has moved from "/departments/biology" to just "/biology", try visiting "/departments/biology". Odds are, you'll go to the right place.

Be aware that Apostrophe already creates "soft redirects" every time you change the slug of a page. This module's usefulness is primarily for big migrations in which much of the content has been re-thought, re-written and moved around.


## Changelog

0.5.3: virtual page URLs are remapped properly to the search redirect route, so they don't 404.

