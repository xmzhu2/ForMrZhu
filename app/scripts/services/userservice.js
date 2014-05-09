'use strict';

angular.module('mrZhuApp')
  .factory('userService', ['$http','localService',

    function ($http,localService) {

     var userService = {

         localFlag:'x_user_local_no_secret',

         user : {
             name:"Mr Who?",
             loginTip:"no 登陆, no 权限!"
         },

         /**
          * 加载本地USER
          */
         loadLocalUser : function(){
            var temp = localService.load(this.localFlag);
            if(temp) this.user = temp ;
            return temp;
         },

         getUser : function(){
           return this.user;
         },

         createLocalUser:function(user){

            if(this.loadLocalUser()){
                return null;
            }

            var tempUser = {
                username:user.name,
                auth:user.auth,
                loginTip:user.loginTip,
                x_id :user.id,
                tip:"很多东西没有加密，所以你可以轻松得到。当然，有些东西，得到了你也永不鸟(^_^)"
            }
             localService.save(this.localFlag,tempUser);
             return tempUser;
         },

         loginAdmin:function(){

         },

         login: function (username,password) {

             var self = this;

             $http.post("/login/default",{
                 username:username,
                 password:password
             }).success(function(data){
                    self.user = self.createLocalUser(data.user);
             });
         }
    };

    userService.loadLocalUser();

    return userService;
  }]);
