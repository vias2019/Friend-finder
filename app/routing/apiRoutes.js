
//var survey =require("../public/survey.html");
var friends=require('../data/friends');
module.exports = function(app) {
    
  
        app.get("/api/friends", function(req, res) {
      res.json(friends);//string, json, files
      console.log(friends);
    });
    
    
    function sumOfFriendPoints(userdata){
    var mimimum=100;
    var matchingFriend;
      for (var i=0; i<friends.length; i++){
        var totalDifference=0;
        for (var j=0; j<friends[i].scores.length; j++){
           totalDifference += Math.abs(userdata.scores[j]-friends[i].scores[j]);
        }
        if(totalDifference < mimimum){
          mimimum = totalDifference;
          matchingFriend=friends[i];
        }
      }
      return matchingFriend;
    }
  
    app.post("/friends", function(req, res) {
     
     var updatedScore= req.body.scores.map(function(score){
       return parseInt(score)});
     req.body.scores=updatedScore;
     var bestMatch=sumOfFriendPoints(req.body);
     
     friends.push(req.body);
     console.log("friends array",friends)
     res.json(bestMatch);
      });
  };
  