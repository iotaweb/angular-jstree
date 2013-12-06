'use strict';

// Angular app

angular.module('treeDemo', [
    'ng',
    'treeDemo.controllers',
    'treeDemo.directives'
])


// Configuration

.config(function($routeProvider, $locationProvider) {
    
    $routeProvider
    .when('/', {
        templateUrl: 'views/tree.html',
        controller: 'TreeCtrl'
    })    
    .otherwise({
        redirectTo: '/'
    });
  
    // Removes the # in urls
    $locationProvider.html5Mode(true);
  
});
