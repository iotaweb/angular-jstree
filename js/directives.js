'use strict';

// Directives

angular.module('treeDemo.directives', [])


// Tree directive

.directive('jstree', function($timeout, $parse) {

    return {
        restrict: 'A',
        require: '?ngModel',
        scope: {
            apiBase: '@',
            apiRoot: '@',
            selectedNode: '=',
            selectedNodeChanged: '='
        },
        link: function(scope, element, attrs) {

            var treeElement = $(element);
            var tree = treeElement.jstree({
                'json_data': {
                    'ajax': {
                        'url' : function(node){
                            if (node === -1) { // root of tree
                                var file = scope.apiRoot;
                            } else {
                                var file = $(node).attr('subid');
                            }
                            return scope.apiBase + file + '.json';
                        },
/*
                        // This is more like how you would implement it for real...
                        'url' : function(node){
                            if (node === -1) { // root of tree
                                var pid = '';  // no parent
                            } else {
                                var pid = $(node).attr('id’); // parent id
                            }
                            return scope.apiBase + ‘?parent=' + pid + '&levels=2';
                        },
*/                        
                        'data': function(n) {
                             return {
                                 'operation': 'get_children',
                                 'id': n.attr ? n.attr('id').replace('node_', '') : 1
                             };
                        }
                    }
                },
                'themes': {
                    'theme': 'classic'
                },
                'plugins': ['themes', 'json_data', 'ui']
            });

            tree.bind('select_node.jstree', function() {

            $timeout(function() {

                scope.selectedNode = {
                    id: treeElement.jstree('get_selected').attr('id'),
                    text: treeElement.find('.jstree-clicked').text(),
                    subid: treeElement.jstree('get_selected').attr('subid')
                };

                if (scope.selectedNodeChanged) {
                    $timeout(function() {

                        scope.selectedNodeChanged(scope.selectedNode);
                    });
                }
            });

            });
        }
    };
});