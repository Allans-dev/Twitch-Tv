$(document).ready(function(){
  //dropdown button animation
$("#startBtn").click(function(){
  $("#dropdown-menu").slideToggle(600);
  var border = $("#startBtn").css("border-radius");
  if (border == "10px"){
  $("#startBtn").css("border-radius","10px 10px 0px 0px");
}else{
  setTimeout(function (){ $("#startBtn").css("border-radius","10px"); }, 600)
}
})

//url
var url= "https://api.twitch.tv/kraken";

//streamers
var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
"storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"]

//Client ID
var ClientID = "3a3w8mhzxrpaj5al96nh2n8wm8en7e"

//ajax API request stream data

for (var i=0; i<streamers.length; i++){

var request = new XMLHttpRequest();
request.open("GET", url + "/channels/" + streamers[i] + "?client_id=" + ClientID, true);

request.onload= function(){

  if (this.status >= 200 & this.status < 400){
    //success actions
    var data = JSON.parse(this.response);
    //shortening status
    if (data.status.length > 36){
      var streamStatus = data.status.substring(0,36);
      streamStatus += "..."
    }else{
      streamStatus = data.status;
    }
    if (data.status.length > 20){
      var streamStatusShort = data.status.substring(0,20);
      streamStatusShort += "..."
    }else{
      streamStatusShort = data.status;
    }

    //all streamers
    $("#all ul").append("<a href='" + data.url + "' target='_blank'> <img src='" + data.logo + "' placeholder='stream_icon'> <li><span class='heading2'>" + data.display_name + "</span><br>" + data.game + "</li></a>");
    $("#searchResults ul").append("<a href='" + data.url + "' target='_blank'><img src='" + data.logo + "' placeholder='stream_icon'> <li><span class='searchClass heading2'>" + data.display_name + "</span><br><span class='padding'>" + data.game + "</span><br><span class='align'>" + streamStatusShort + "</span></li></a>");

    //split between online and offline
  if (data.game == null){
    $("#offline ul").append("<a href='" + data.url + "' target='_blank'><img src='" + data.logo + "' placeholder='stream_icon'> <li><span class='heading2'>" + data.display_name + "</span><br> offline</li></a>");
  }else{
    $("#online ul").append("<a href='" + data.url + "' target='_blank'><img src='" + data.logo + "' placeholder='stream_icon'> <li><span class='heading2'>" + data.display_name + "</span><br>" + data.game + "<br><span class='align'>" + streamStatus + "</span></li></a>");
  }

  //broken streams
}else if (this.status === 404) {
  var udata = JSON.parse(this.response);
  $("#searchResults ul").append("<a href='https://www.twitch.tv/'><img src='http://i.imgur.com/E0A2JnD.png' placeholder='stream_icon'><li><span class='searchClass'>" + udata.message + "</span><br><span class='align'>click to browse Twitch.tv</span></li></a>");
  $("#all ul").append("<a href='https://www.twitch.tv/'><img src='http://i.imgur.com/E0A2JnD.png' placeholder='stream_icon'><li><span>" + udata.message + "</span><br>click to browse Twitch.tv </li></a>");
  $("#offline ul").append("<a href='https://www.twitch.tv/'><img src='http://i.imgur.com/E0A2JnD.png' placeholder='stream_icon'><li><span>" + udata.message + "</span><br>click to browse Twitch.tv </li></a>");
};//onload function

  //connection error message
request.onerror = function(){
  alert("connection error, please try refreshing the page")
  }

};//onload

request.send();

}//loop

//search function
var input = document.getElementById("search");
input.onkeyup = function search (){
  var filter = input.value.toUpperCase();
  var searchList = document.getElementById("searchResults");
  var displayContainer = searchList.getElementsByTagName("a");
  var nameContainer = document.getElementsByClassName("searchClass");
  var displayArr = [];
  var b4name = "'" + filter;

for (var e=0; e<nameContainer.length; e++){
 var name = nameContainer[e].innerHTML;

 if (name.toUpperCase().indexOf(filter) == 0 && name.length < 30 && filter != ""){
   displayContainer[e].style.display = "block";
 }else if(name.toUpperCase().indexOf(b4name) == 8 && filter != "") {
   displayContainer[e].style.display = "block";
 }else {
   displayContainer[e].style.display = "none";
 }
 displayArr.push(displayContainer[e].style.display);
}//search loop

//no result
var noResult = document.getElementById("na");
if (displayArr.indexOf("block") == -1 && filter != ""){
noResult.style.display = "block";
}else{
noResult.style.display = "none";
}

}//onkeyup


})//doc ready
