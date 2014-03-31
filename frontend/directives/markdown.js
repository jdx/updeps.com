'use strict';

angular.module('app.directives').
    directive('markdown', function() {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
            if(!ngModel) return;

            ngModel.$render = _.throttle(function() {
                var text, html;
                text = ngModel.$viewValue || '';
                html = markdown.toHTML(text);
                element.html(html);
            }, 150);
        }
    };
});
