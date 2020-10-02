let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let port = process.env.PORT || 4000;
let logger = require("log-commander"); 
const log = new logger.Logger(); 


var utenti = [
  {
    "mail": "traba@is.tk",
    "password": "123"

  },
  {
    "mail": "adaware@is.tk",
    "password": "123"

  },
  {
    "mail": "lorix@is.tk",
    "password": "123"

  },
  {
    "mail": "sommo@encelo.nc",
    "password": "123"

  }

];

app.get('/dologin', async function (req, res) {
  let mail = req.query.mail;
  let password = req.query.password;

  utenti.forEach(utente => {
    if (mail == utente.mail && password == utente.password) {
      res.status(200).send()
    }

  });


  res.status(401).send({ error: 'Errore 401' });

  console.log(mail, password);








});
app.use('/static', express.static(__dirname + '/public'));
app.use('/login', express.static(__dirname + '/login'));
app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/public/html/chat.html');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/login/login.html');
});
app.get('/textchat', function (req, res) {
  res.sendFile(__dirname + '/public/html/chat.html');
});

io.on('connection', function(socket){
  
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
