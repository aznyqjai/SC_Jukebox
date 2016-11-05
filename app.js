$(document).ready(function(){

  SC.initialize({
    client_id: 'f665fc458615b821cdf1a26b6d1657f6'
  });

});


var jukebox = new JukeBox();


function JukeBox(){
  this.songs =[]; 
  this.current_Song_index = 0; 
  this.song_w_methods;

  this.search=function(keyword){
    $("#searchlist").html("");
    var that = this;
    keyword= $("#search").val();
    console.log("keyword is:  "+ keyword);
    SC.get("/tracks", {q: keyword }).then(function(response){
      that.songs = response; 
      for (var i=0; i<response.length; i++){
      $("#searchlist").append(response[i].title+"<br>");
    };
    });

  }


  this.play=function(){
    var target=this.songs[this.current_Song_index];
    console.log("play() fires and playing " + this.songs[this.current_Song_index].title);
    $("#poster").html("<img src="+"\""+target.artwork_url+"\">");
    $("#artist").html(target.user.username);
    $("#title").html(target.title);
    $("#description").html(target.description);
    $("#genre").html(target.genre);
    $("#release_date").html(target.release);
    SC.stream( '/tracks/' + target.id ).then(function(player){
      this.song_w_methods=player;
      this.song_w_methods.play();
      this.song_w_methods.on("finish",function(){
       // debugger;
        this.jukebox.next();
       // debugger;
      });
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



  this.pause=function(){
    console.log("pause() fired");
    song_w_methods.pause();
  }

  this.random=function(){
    console.log("array length = " + this.songs.length);
    var rand_num = Math.floor((Math.random() * this.songs.length) + 1);
    console.log("random num = "+ rand_num);
    this.current_Song_index=rand_num;
    this.play();
  }

}
