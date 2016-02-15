This is a static site built with metalsmith -- see metalsmith.js for the pipeline. Most of the standard metalsmith plugins are used, plus a few tricks.

I don't like YAML frontmatter, and the only per-post metadata I need is date and template type, so I encode them in the file name and extension, respectively. metalsmith-date-in-filename gets the date; a custom metalsmith middleware sets the template.

I use metalsmith-browserify to generate a static site JavaScript bundle for the WebGL animations. Within the bundle I use many [stackgl](http://stack.gl/) modules. Thanks in particular to [glslbin](http://glslb.in/) for example code.

I use metalsmith-serve and metalsmith-watch for local development. I use the directory `animations` as the build destination, then serve the root of the project, so that paths start with `/animations` like in production.

This is my first time using metalsmith. Here are some pros and cons as I see them.

Pros:

* Good architectural fundamentals.
* Superb low-level control. I couldn't do this with Jekyll.
* Works well once you make the (significant) initial investment.

Cons:

* Variable module quality. Even the most commonly used modules have odd design choices that'll trip you up. (E.g. metalsmith-permalinks's `relative` option.)
* Setting up a pipeline is time consuming. You **will** need to read the source code of most every module you use and step through it in a debugger to figure out why it isn't working.
* No common convention for flow control; most modules invent their own pattern matching or filtering convention.
* Key modules are effectively unmaintained. (`metalsmith-collections` and `metalsmith-permalinks`.)
