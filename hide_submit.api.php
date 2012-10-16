<?php


/**
 * Allows modules alter the behavior of the hide_submit settings.
 *
 * @return
 *   An associative array describing the data structure. Primary key is the
 *   name used internally by Views for the table(s) – usually the actual table
 *   name. The values for the key entries are described in detail below.
 */
function hook_hide_submit_alter($hide_submit_settings) {
  // Creates a random class between 1 and 10 for using 10 random images
  // in place of the submit button.
  $rand = rand(1, 10);
  $hide_submit_settings['hide_submit']['hide_submit_hide_css'] = 'hide-submit-processing' . $rand;

  // Disable the module for my special form page.
  if (arg(0) == 'my-special-form') {
    $hide_submit_settings['hide_submit']['hide_submit_status'] = FALSE;
  }

  return $data;
}
