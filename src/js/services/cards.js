(function () {
    'use strict';

    var module = angular.module('hearthstone-art.cardsFactory', ['ngResource'])
        .factory('Cards', ['$resource',
            function ($resource) {

                return {

                    getCards: function () {
                        return $resource('data/cards.json', {},
                            {
                                'get': {
                                    isArray: true
                                }
                            }
                        );
                    },

                    getRarities: function () {
                        return $resource('data/rarities.json', {},
                            {
                                'get': {
                                    isArray: true
                                }
                            }
                        );
                    },

                    getSets: function () {
                        return $resource('data/sets.json', {},
                            {
                                'get': {
                                    isArray: true
                                }
                            }
                        );
                    },

                };

            }
        ]);

}());