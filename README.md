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

## Usage

Try visiting various URLs that formerly 404'd on your site. For instance, if "Biology" has moved from "/departments/biology" to just "/biology", try visiting "/departments/biology". Odds are, you'll go to the right place.

Be aware that Apostrophe already creates "soft redirects" every time you change the slug of a page. This module's usefulness is primarily for big migrations in which much of the content has been re-thought, re-written and moved around.
