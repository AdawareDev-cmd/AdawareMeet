$(function () {
    var socket = io();
    $('#loginform').submit(function(e){
      var d = new Date();  
     var mail = $('#inputmail').val();
     var password =$('#inputpassword').val();  
    


        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 ) {
              if( this.status == 200){
                
                localStorage.setItem("user",mail.split("@")[0])
                location.href = "/textchat";



              }else{
                  alert("Errore 401 Password Errata o Email ");
              }
          }
        };
        xhttp.open("GET", "dologin?mail="+mail+"&password="+password, true);
        xhttp.send();
      
  
      e.preventDefault();
      return false;
    });
    socket.on('chat message', function(msg){

      $('#messages').append($('<li>').text(msg));
      window.scrollTo(0, document.body.scrollHeight);
    });
  });