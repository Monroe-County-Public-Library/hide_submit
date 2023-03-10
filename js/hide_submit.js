/**
 * @file
 * A JavaScript file for the theme.
 * This file should be used as a template for your other js files.
 * It defines a backdrop behavior the "Backdrop way".
 *
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

(function ($, Backdrop, window, document, undefined) {
  'use strict';

  // To understand behaviors, see https://drupal.org/node/756722#behaviors
  Backdrop.behaviors.hideSubmitBlockit = {
    attach: function(context) {
      var timeoutId = null;
      $('form', context).once('hideSubmitButton', function () {
        var $form = $(this);

        // Bind to input elements.
        if (Backdrop.settings.hide_submit.hide_submit_method === 'indicator') {
          // Replace input elements with buttons.
          $('input.form-submit', $form).each(function(index, el) {
            var attrs = {};

            $.each($(this)[0].attributes, function(idx, attr) {
                attrs[attr.nodeName] = attr.nodeValue;
            });

            $(this).replaceWith(function() {
                return $("<button/>", attrs).append($(this).attr('value'));
            });
          });
          // Add needed attributes to the submit buttons.
          $('button.form-submit', $form).each(function(index, el) {
            $(this).addClass('ladda-button button').attr({
              'data-style': Backdrop.settings.hide_submit.hide_submit_indicator_style,
              'data-spinner-color': Backdrop.settings.hide_submit.hide_submit_spinner_color,
              'data-spinner-lines': Backdrop.settings.hide_submit.hide_submit_spinner_lines
            });
          });
          Ladda.bind('.ladda-button', $form, {
            timeout: Backdrop.settings.hide_submit.hide_submit_reset_time
          });
        }
        else {
          $('input.form-submit, button.form-submit', $form).click(function (e) {
            var el = $(this);
            el.after('<input type="hidden" name="' + el.attr('name') + '" value="' + el.attr('value') + '" />');
            return true;
          });
        }

        // Bind to form submit.
        $('form', context).submit(function (e) {
          var $inp;
          if (!e.isPropagationStopped()) {
            if (Backdrop.settings.hide_submit.hide_submit_method === 'disable') {
              $('input.form-submit, button.form-submit', $form).attr('disabled', 'disabled').each(function (i) {
                var $button = $(this);
                if (Backdrop.settings.hide_submit.hide_submit_css) {
                  $button.addClass(Backdrop.settings.hide_submit.hide_submit_css);
                }
                if (Backdrop.settings.hide_submit.hide_submit_abtext) {
                  $button.val($button.val() + ' ' + Backdrop.settings.hide_submit.hide_submit_abtext);
                }
                $inp = $button;
              });

              if ($inp && Backdrop.settings.hide_submit.hide_submit_atext) {
                $inp.after('<span class="hide-submit-text">' + Backdrop.checkPlain(Backdrop.settings.hide_submit.hide_submit_atext) + '</span>');
              }
            }
            else if (Backdrop.settings.hide_submit.hide_submit_method !== 'indicator'){
              var pdiv = '<div class="hide-submit-text' + (Backdrop.settings.hide_submit.hide_submit_hide_css ? ' ' + Backdrop.checkPlain(Backdrop.settings.hide_submit.hide_submit_hide_css) + '"' : '') + '>' + Backdrop.checkPlain(Backdrop.settings.hide_submit.hide_submit_hide_text) + '</div>';
              if (Backdrop.settings.hide_submit.hide_submit_hide_fx) {
                $('input.form-submit, button.form-submit', $form).addClass(Backdrop.settings.hide_submit.hide_submit_css).fadeOut(100).eq(0).after(pdiv);
                $('input.form-submit, button.form-submit', $form).next().fadeIn(100);
              }
              else {
                $('input.form-submit, button.form-submit', $form).addClass(Backdrop.settings.hide_submit.hide_submit_css).hide().eq(0).after(pdiv);
              }
            }
            // Add a timeout to reset the buttons (if needed).
            if (Backdrop.settings.hide_submit.hide_submit_reset_time) {
              timeoutId = window.setTimeout(function() {
                hideSubmitResetButtons(null, $form);
              }, Backdrop.settings.hide_submit.hide_submit_reset_time);
            }
          }
          return true;
        });
      });

      // Bind to clientsideValidationFormHasErrors to support clientside validation.
      // $(document).bind('clientsideValidationFormHasErrors', function(event, form) {
        //hideSubmitResetButtons(event, form.form);
      // });

      // Reset all buttons.
      function hideSubmitResetButtons(event, form) {
        // Clear timer.
        window.clearTimeout(timeoutId);
        timeoutId = null;
        switch (Backdrop.settings.hide_submit.hide_submit_method) {
          case 'disable':
            $('input.' + Backdrop.checkPlain(Backdrop.settings.hide_submit.hide_submit_css) + ', button.' + Backdrop.checkPlain(Backdrop.settings.hide_submit.hide_submit_css), form)
              .each(function (i, el) {
                $(el).removeClass(Backdrop.checkPlain(Backdrop.settings.hide_submit.hide_submit_hide_css))
                  .removeAttr('disabled');
              });
            $('.hide-submit-text', form).remove();
            break;

          case 'indicator':
            Ladda.stopAll();
            break;

          default:
            $('input.' + Backdrop.checkPlain(Backdrop.settings.hide_submit.hide_submit_css) + ', button.' + Backdrop.checkPlain(Backdrop.settings.hide_submit.hide_submit_css), form)
              .each(function (i, el) {
                $(el).stop()
                  .removeClass(Backdrop.checkPlain(Backdrop.settings.hide_submit.hide_submit_hide_css))
                  .show();
              });
            $('.hide-submit-text', form).remove();
        }
      }
    }
  };

})(jQuery, Backdrop, window, this.document);
