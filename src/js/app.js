(function() {
     'use strict';

    var module = angular.module('hearthstone-art', [
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