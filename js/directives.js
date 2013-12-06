'use strict';

// Directives

angular.module('treeDemo.directives', [])


// Tree directive

.directive('jstree', function($timeout, $parse) {

    return {
        restrict: 'A',
        require: '?ngModel',
        scope: {
            apiRoot: '@',
            selectedNode: '=',
            nodeChanged: '='
        },
        link: function(scope, element, attrs) {
        
            var treeElement = $(element);
            var tree = treeElement.jstree({
                'json_data': {
                    'ajax': {
                        'url' : function(node){
                            if (node === -1) { // root of tree
                                return scope.apiRoot + 'root.json';
                            } else {
                                var subid = $(node).attr('subid');
                                console.log(subid);
                                return scope.apiRoot + subid + '.json';
                            }
                        },
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
                        
                scope.selectedNode = {
                    id: treeElement.jstree('get_selected').attr('id'),
                    text: treeElement.find('.jstree-clicked').text(),
                    subid: treeElement.jstree('get_selected').attr('subid')
                };
                
                if (scope.nodeChanged) {
                   scope.nodeChanged(scope.selectedNode);
                }        
                
            });
        }
    };
});