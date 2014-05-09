'use strict';

angular.module('mrZhuApp')
  .controller('NavbarCtrl', function ($scope, $location) {

    var login = {
        title : "Login"
    }
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
        title:'News',
        tip:false
    },login
    ];


    $scope.$on("userLogin",function(event,data){
        login.title = 'loginOut';
    })

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
