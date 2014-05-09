'use strict';

var userInfoDB = "./userInfoDB",
    userCache = {

        userList:{

        },

        addUser:function(user){

            var id = user.username + "_" +  user.password,
                userList = this.userList;

            if(userList[id]){
                console.log("User has cunzai,User id : "+id );
            }else{
                userList[id] = user;
            }

        },

        getUser:function(username,password){
            var id = username + "_" + password;

            return this.userList[id];

        },

        updateUser : function(id,key,value){
            var user = this.userList[id];
            if(user){
                user[key] = value;
            }
        }

    },
    fs = require('fs');

/**
 * Send partial, or 404 if it doesn't exist
 */
exports.login = function(req,res){

    var username = req.body.username,
        password = req.body.password,
        path = username + "_"+password ;

    //先去缓存中 加载user
    var user = userCache.getUser(username,password);

    //文件系统加载user
    if(!user){



    }

    res.send(resultUser(user));

    console.log(info);

}

/**
 * Send our single page app
 */
exports.index = function(req, res) {
  res.render('index');
};


function resultUser(user){

    var temp = {};

    temp.username = user.username;
    temp.auth = user.auth;
    temp.loginTip = user.loginTip;
    temp.id  = user.id;
    temp.password = "你想看密码嘛？";

    return temp;
}

function filterLogin(){

}