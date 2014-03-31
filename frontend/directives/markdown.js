'use strict';

var _ = require('lodash'),
    highlightjs = require('highlight.js');

app.directive('markdown', function() {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
            if(!ngModel) return;

            ngModel.$render = _.throttle(function() {
                var text, html;
                text = ngModel.$viewValue || '';
                html = highlightjs.highlight('markdown', text).value;
                element.html(html);
            }, 150);
        }
    };
});
