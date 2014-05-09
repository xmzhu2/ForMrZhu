'use strict';

angular.module('mrZhuApp')
  .controller('MainCtrl', ['$scope','$http','userService','loadingService',
    function ($scope, $http , userService,loadingService) {

        var user = $scope.user = userService.getUser();

        var teach = $scope.teach = {

            newTeachStep:0,

            next: function(){
                this.newTeachStep ++;
            },

            end: function(){

                this.newTeachStep = 0;
                loadingService.unload();

                if(!user.auth) {
                    alert("当前尚未登陆，是否需要登录？")
                }
            }
        }

        var login = $scope.login = {

            login:function(){

                if(!this.username || !this.password){
                    alert("Please shu ru Username/Password");
                    return;
                }

                userService.login(this.username, this.password);
            },

            show:function(){
                $scope.loginShow = !$scope.loginShow;
            }

        }

        $scope.$on("toolbarEvent",function(event,name){

            switch(name){
                case "News":

                    teach.newTeachStep = 1;
                    loadingService.load();
                    break;
                case "Login":
                    login.show();
                    break;
                default:
                    break;
            }

        })

        $http.get('/api/awesomeThings').success(function(awesomeThings) {
          $scope.awesomeThings = awesomeThings;
        });

  }]);

