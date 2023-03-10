Hide Submit Button
==================

Hide submit module provides a way to hide the submit button in forms after
it has been clicked. This helps to prevent duplicate postings from people who
accidentally double click (or triple click) on a submit button.

Installation 
------------

- Install this module using the official Backdrop CMS instructions at
  https://docs.backdropcms.org/documentation/extend-with-modules.

- Visit the configuration page under Administration > Configuration > Content authoring > Hide submit settings (admin/config/content/hide-submit) and enter the required information.

- There are no module dependencies and no database tables created.

- Uninstalling the module will remove the variables created by the module.

Documentation 
-------------

Additional documentation is located in [the Wiki](https://github.com/backdrop-contrib/hide-submit/wiki/Documentation).

Issues 
------

Bugs and feature requests should be reported in [the Issue Queue](https://github.com/backdrop-contrib/hide-sibmit/issues).

Current Maintainers
-------------------

- [Paula Gray-Overtoom](https://github.com/pgrayove-mcpl).
- Seeking additional maintainers.

Credits
-------

- Ported to Backdrop CMS by [Paula Gray-Overtoom](https://github.com/pgrayove-mcpl).
- Originally written for Drupal by [Optalgin](https://www.drupal.org/u/optalgin).

The original hide_submit jQuery snippet was taken from Ted Serbinski's blog
-http://tedserbinski.com/tags/jquery/how-prevent-duplicate-posts

See also this discussion:
http://drupal.org/node/107358


ADVANCED CHANGES
================
You can alter the style of affected buttons by overriding css rules. The two
css style rules to consider are:

div.hide-submit-disable - for disabled buttons.
div.hide-submit-processing - for hidden buttons.

There are two hidden variables for the values of the css classes. You can modify
these by setting a variable in the $conf array in your settings.php or using the
drush vset command. The variables are: hide_submit_css and hide_submit_hide_css.

The module calls a hook (hook_hide_submit_alter) to let other modules modify the
behavior of the module. This could be used, for example, to create a random
image effect by tweaking the css styles on each page load.

The hidden variable hide_submit_status allows a site to enable or disable the
module. This is most useful as part of the hook_hide_submit_alter to disable
the module on certain pages.

See hide_submit.api.php for an example implementation of hook_hide_submit_alter.
