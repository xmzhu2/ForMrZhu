'use strict';
(function(){

    var app = angular.module('mrZhuApp');

 app
  .directive('loading',['loadingService', function (loadingService) {
    return {
      template: '<div ng-show="loading.show" class="x_loading"></div>',
      restrict: 'E',
      replace:true,
      link: function postLink(scope, element, attrs) {
          scope.loading = loadingService.getLoading();
      }
    };
  }]);

 app.factory('loadingService',function(){
     return {

         loading:{
             show:false
         },

         load:function(element){
            this.loading.show = true;
         },

         unload:function(){
           this.loading.show = false;
         },

         getLoading:function(){
             return this.loading;
         }
     }
 })

}).call(this);