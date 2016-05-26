(function() {
    'use strict';

    var module = angular.module('hearthstone-art.cardsFactory', ['ngResource'])
        .factory('Cards', ['$resource',
            function($resource) {
                 return $resource('data/cards.json', {},
                     {
                        'get': {
                            isArray: true
                        }
                     }
                 );
            }
        ]);

}());