'use strict'

// Controllers

angular.module('treeDemo.controllers', [])


// Tree controller

.controller('TreeCtrl', function($scope) {

    $scope.nodeChanged = function(newNode) {
    
        // do something when node changed
    
        console.log(newNode.id);
        
        if (newNode.subid) {
            console.log('  %s', newNode.subid);
        }
    };
});