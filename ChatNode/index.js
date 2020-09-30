var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 4000;


var utenti = [
  {
    "mail": "f.dibacco@dromedian.com",
    "password" : "123456"
    
  },
  {
    "mail": "michela@test.",
    "password" : "alice"
    
  },    
  {
    "mail": "guest@dromedian.com",
    "password" : "ciao123"
    
  },
  {
    "mail": "adaware@testoso.com",
    "password": "fabio"
  }

];






app.get('/textchat', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.use('/static', express.static(__dirname + '/public'));
app.use('/login', express.static(__dirname + '/login'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/login/login.html');
});



app.get('/dologin', async function(req, res){
  let mail = req.query.mail;
  let password = req.query.password;

  utenti.forEach(utente => {
    if (mail == utente.mail && password == utente.password){
      res.status(200).send()
    }

  });
  

  res.status(401).send({error: 'Errore 401'});

  console.log(mail,password);








});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
