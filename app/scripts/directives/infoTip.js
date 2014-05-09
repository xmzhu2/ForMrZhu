/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 13-12-17
 * Time: 上午9:51
 * To change this template use File | Settings | File Templates.
 */


(function(){

    var md = angular.module('mrZhuApp');

    Array.prototype.indexOf = function(str){

        for(var i = 0 , len = this.length ; i < len ; i++){
            if(str == this[i]){
                return i;
            }
        }
        return -1;
    }

    var getId = (function(){
        var i = 0;

        return function(){
            return "tip_id_"+(i++);
        }
    })();

    md.directive("tips",['tipService',function(tipService){
        var tipsDirective = {

            replace: true,

            template:'<div class="xmzhu tipContainer">' +
                        '<alert ng-repeat="alert in alerts" class="xmzhu tip" type="alert.type" close="closeAlert($index)">' +
                            '{{alert.msg}}' +
                        '</alert>' +
                      '</div>',
            restrict:'E',
            link: function postLink(scope, iElement, iAttrs) {

                scope.alerts = tipService.getTips();

                scope.closeAlert = function(index){
                    tipService.close(index);
                }
            }

        }

        return tipsDirective;
    }])

    md.factory('tipService',['$timeout',function($timeout){

        var tips = [],oldTips = [],closeQueue = [];

        var tipS = {

            type:[
                'success',
                'danger',
                'info',
                'error'
            ],

            maxLength : 3,

            setMaxLength : function(maxLength){
                this.maxLength = maxLength;
            },

            getTips : function(){
              return tips;
            },

            tip:function(text,type,time,option){

                var self = this;

                type = (this.type.indexOf(type) == -1)?"info":type;

                var tip = {
                    id:getId(),
                    type:type,
                    msg:text || ""
                }

                $timeout(function(){
                    self.closeId(tip.id);
                },time || 4000)

                if(tips.length < this.maxLength ){
                    tips.unshift(tip);
                }else{
                    oldTips.unshift(tips.pop());
                    tips.unshift(tip);
                }

            },

            closeId:function(id){
                for(var i = 0 , len = tips.length ; i < len ; i ++){
                    if(tips[i].id == id){
                       this.close(i);
                    }
                }
            },

            close:function(index){
                tips.splice(index, 1);
            }

        }

        return tipS;
    }])


}).call(this);