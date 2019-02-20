/* ----------------------------------------------------------------------------
 * Easy!Appointments - Open Source Web Scheduler
 *
 * @package     EasyAppointments
 * @author      A.Tselegidis <alextselegidis@gmail.com>
 * @copyright   Copyright (c) 2013 - 2018, Alex Tselegidis
 * @license     http://opensource.org/licenses/GPL-3.0 - GPLv3
 * @link        http://easyappointments.org
 * @since       v1.0.0
 * ---------------------------------------------------------------------------- */

// BGB soporte find en IE
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}
 
/**
 * Backend Calendar
 *
 * This module contains functions that are used by the backend calendar page.
 *
 * @module BackendCalendar
 */
window.BackendCalendar = window.BackendCalendar || {};

(function (exports) {

    'use strict';

    /**
     * Bind common event handlers.
     */
    function _bindEventHandlers() {
        var $calendarPage = $('#calendar-page');

        $calendarPage.on('click', '#toggle-fullscreen', function () {
            var $target = $(this);
            var element = document.documentElement;
            var isFullScreen = (document.fullScreenElement && document.fullScreenElement !== null)
                || document.mozFullScreen
                || document.webkitIsFullScreen;

            if (isFullScreen) {
                // Exit fullscreen mode. 
                if (document.exitFullscreen)
                    document.exitFullscreen();
                else if (document.msExitFullscreen)
                    document.msExitFullscreen();
                else if (document.mozCancelFullScreen)
                    document.mozCancelFullScreen();
                else if (document.webkitExitFullscreen)
                    document.webkitExitFullscreen();

                $target
                    .removeClass('btn-success')
                    .addClass('btn-default');

            } else {
                // Switch to fullscreen mode.
                if (element.requestFullscreen)
                    element.requestFullscreen();
                else if (element.msRequestFullscreen)
                    element.msRequestFullscreen();
                else if (element.mozRequestFullScreen)
                    element.mozRequestFullScreen();
                else if (element.webkitRequestFullscreen)
                    element.webkitRequestFullscreen();

                $target
                    .removeClass('btn-default')
                    .addClass('btn-success');
            }
        });
    }

    /**
     * Initialize Module
     *
     * This function makes the necessary initialization for the default backend calendar page. If this module
     * is used in another page then this function might not be needed.
     *
     * @param {String} view Optional (default), the calendar view to be loaded.
     */
    exports.initialize = function (view) {
        // Load and initialize the calendar view. 
        if (view === 'table') {
            BackendCalendarTableView.initialize();
        } else {
            BackendCalendarDefaultView.initialize();
        }

        BackendCalendarGoogleSync.initialize();
        BackendCalendarAppointmentsModal.initialize();
        BackendCalendarUnavailabilitiesModal.initialize();

        _bindEventHandlers();
    };

})(window.BackendCalendar);
