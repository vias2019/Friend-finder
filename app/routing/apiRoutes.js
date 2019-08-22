
//var survey =require("../public/survey.html");
var path = require('path');
var friends=require('../data/friends');
module.exports = function(app) {
    
  
    app.get("/friends", function(req, res) {
      res.json(friends);
      console.log(res.json(friends));
    });

    app.get("/api/survey", function(req, res) {
      res.json(req.body);
      console.log(res.json(req.body));
    });
    //var newArray=[];
    
    
    function sumOfFriendPoints(userdata){
    var mimimum=100;
    var matchingFriend;
      for (var i=0; i<friends.length; i++){
        var totalDifference=0;
        for (var j=0; j<friends[i].scores; j++){
           totalDifference += Math.abs(userdata.scores[j]-friends[i].scores[j]);
          
          //newArray.push(Math.abs(userdata-friends[i].scores[j]));
        }
        if(totalDifference < mimimum){
          mimimum = totalDifference;
          matchingFriend=friends[i];
        }
      }
      return matchingFriend;
    }
  
    // function searchMinimumValue(){
    //   sumOfFriendPoints();
    //   var findIndex=newArray.indexOf(Math.min.apply(null, newArray));
    //   console.log(newArray.indexOf(Math.min.apply(null, newArray)));
    //   var findFriend=friends[findIndex];
    //   console.log(friends[findIndex]);
    //   return findFriend;
    // }
    //searchMinimumValue();
    app.post("/friends", function(req, res) {
     var bestMatch=sumOfFriendPoints(req.body);
     res.json(bestMatch);
      });
  };
  