(function() {
    'use strict';

    var module = angular.module('hearthstone-art.cardsController', [])
        .controller('CardsController', ['$scope', 'Cards',
            function($scope, Cards) {
                Cards.get(function(data) {
                    $scope.cards = data;
                });
            }]);
}());