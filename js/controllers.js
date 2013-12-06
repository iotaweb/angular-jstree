'use strict'

// Controllers

angular.module('treeDemo.controllers', [])


// Tree controller

.controller('TreeCtrl', function($scope) {

    $scope.nodeChanged = function(node) {
    
        // do something when node changed
    
        console.log(node.id);
        
        if (node.subid) {
            console.log('  %s', node.subid);
        }
    };
});