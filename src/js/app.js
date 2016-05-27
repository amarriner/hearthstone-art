(function() {
     'use strict';

    var module = angular.module('hearthstone-art', [
        'hearthstone-art.cardsController',
        'hearthstone-art.cardsFactory',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ui.bootstrap'
    ])
        .config(['$routeProvider',

            function($routeProvider) {

                $routeProvider.when('/', {
                    templateUrl: 'js/views/index.html'
                }).otherwise({
                    retirectTo: '/'
                });
            }

        ])
        .directive('cardInfo', [
            function() {
                return {
                    restrict: 'E',
                    templateUrl: 'js/views/card-info.html'
                };
            }
        ])
        .value('imageHost', 'http://amarriner.com/hearthstone/full_art');

}());