$(document).ready(function(){

  SC.initialize({
    client_id: 'f665fc458615b821cdf1a26b6d1657f6'
  });

});


var jukebox = new JukeBox();


function JukeBox(){
  this.songs =[]; 
  this.current_Song_index = 0; 
  this.player;
  this.playerArr=[];
  this.playerArrIndex=0;

  this.search=function(keyword){
    this.songs=[];
    this.current_Song_index = 0; 
    this.player;
    this.playerArr=[];
    $("#searchlist").html("");
    var that = this;
    keyword= $("#search").val();
    console.log("keyword is:  "+ keyword);
    SC.get("/tracks", {q: keyword }).then(function(response){
      that.songs = response; 
      for (var i=0; i<response.length; i++){
      $("#searchlist").append(i + ":   "+ response[i].title+"  "+response[i].duration+"<br>");
    };
    });

  }


  this.play=function(){
    console.log("begin of play:  "  + this.player);
    var that=this;
    var target=this.songs[this.current_Song_index];
    console.log("play() fires and playing index " +this.current_Song_index+ " :  " + this.songs[this.current_Song_index].title);
    $("#poster").html("<img src="+"\""+target.artwork_url+"\">");
    $("#artist").html(target.user.username);
    $("#title").html(target.title);
    $("#description").html(target.description);
    $("#genre").html(target.genre);
    $("#release_date").html(target.release);
    SC.stream( '/tracks/' + target.id ).then(function(player){
      that.playerArr.push(player);
      that.playerArrIndex+=1;
      //this.player=player;
      //this.playerArr.push(player);
      that.playerArr[that.current_Song_index].play();
      
      //console.log("acutual song:  "+ this.player);
      // this.player.on("finish",function(){
      //  // // debugger;
      //  console.log("current scope" + this);
      //   that.next();
      //  // debugger;
      // });
    });
  }


  this.next=function(){
    if (this.current_Song_index===this.songs.length-1){
      this.current_Song_index=0;
      this.play();
    }
    else {
      this.current_Song_index+=1;
      this.play();
    }
  }

  this.previous=function(){
    if (this.current_Song_index===0){
      this.current_Song_index=0;
      this.play();
    }
    else {
      this.current_Song_index-=1;
      this.play();
    }
  }

  this.pause=function(){
    console.log("pause() fired");
    this.playerArr[this.current_Song_index].pause();
  }

  this.random=function(){
    console.log("array length = " + this.songs.length);
    var rand_num = Math.floor((Math.random() * this.songs.length) + 1);
    console.log("random num = "+ rand_num);
    this.current_Song_index=rand_num;
    this.play();
  }

}
