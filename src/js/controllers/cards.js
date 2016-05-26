(function() {
    'use strict';

    var module = angular.module('hearthstone-art.cardsController', [])
        .controller('CardsController', ['$scope', '$uibModal', '$filter', 'Cards',
            function($scope, $uibModal, $filter, Cards) {

                $scope.index = 0;
                $scope.rarity = 'COMMON';
                $scope.set = 'EXPERT1';
                
                Cards.get(function(data) {
                    $scope.CARDS = data;
                    $scope.filterCards();
                });

                $scope.filterCards = function() {
                    $scope.cards = $filter('orderBy')($filter('filter')($scope.CARDS, {
                        rarity: $scope.rarity,
                        set: $scope.set
                    }), 'name');
                };
                
                $scope.open = function (i) {

                    var modalInstance = $uibModal.open({
                        templateUrl: 'js/views/card.html',
                        controller: 'CardModalController',
                        resolve: {
                            index: function() {
                                return i;
                            },
                            cards: function() {
                                return $scope.cards;
                            }
                        }
                    });

                };

            }
        ])
        .controller('CardModalController', ['$http', '$scope', '$uibModalInstance', 'cards', 'imageHost', 'index',
            function ($http, $scope, $uibModalInstance, cards, imageHost, index) {

                $scope.cards = cards;
                $scope.index = index;
                $scope.image = null;
                $scope.imageError = false;
                $scope.imageHost = imageHost;

                $scope.next = function() {

                    if (!$scope.cards.length) { return; }

                    $scope.index++;

                    if ($scope.index >= $scope.cards.length) {
                        $scope.index = 0;
                    }

                    $scope.setImage();
                };

                $scope.prev = function() {
                    if (!$scope.cards.length) { return; }

                    $scope.index--;

                    if ($scope.index < 0) {
                        $scope.index = $scope.cards.length - 1;
                    }

                    $scope.setImage();
                };

                $scope.setImage = function(i) {

                    if (i) {
                        $scope.index = i;
                    }

                    if (!$scope.cards) {
                        return;
                    }

                    $scope.image = null;
                    $scope.imageError = false;

                    $http.get($scope.imageHost + '/' + $scope.cards[$scope.index].id + '.png', {responseType: 'arraybuffer'})
                        .then(
                            function (response) {

                                var blob = new Blob([response.data], {type: 'image/png'});
                                $scope.image = (window.URL || window.webkitURL).createObjectURL(blob);

                            },

                            function (error) {

                                $scope.imageError = true;

                            }
                        );
                };

                $scope.setImage();
            }
        ]);

}());