(function() {
     'use strict';

    var module = angular.module('hearthstone-art', [
        'hearthstone-art.cardsController',
        'hearthstone-art.cardsFactory',
        'ngResource',
        'ngRoute'
    ])
        .config(['$routeProvider',

            function($routeProvider) {

                $routeProvider.when('/', {
                    templateUrl: 'js/views/index.html'
                }).otherwise({
                    retirectTo: '/'
                });
            }

        ]);

}());