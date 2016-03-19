//Importacion de Express
var express = require('express');
var app = express();

var http = require('http').Server(app);

//Importacion de Socket.IO
var io = require('socket.io')(http);

//Almacena infromacion de los votos.
var Indicadores = 	{
						"Trabaja" : 0,
						"Estudia" : 0
					};

//Vistas con JADE
app.set("view engine","jade");

//Carpeta estatica para gestion de archivos
app.use(express.static("public"));

//Solicitud para index o root
app.get('/', function(req, res){

	console.log("Var Trabaja Estado acutal : " + Indicadores.Trabaja);
	console.log("Var Estudia Estado acutal : " + Indicadores.Estudia);
	res.render("index.jade");
	
});

//Recepcion de datos de los usuarios
io.on('connection',function(socket){

	console.log("Usuario conectado!");

	//Recepcion de datos de los usuarios 
	socket.on('information', function(msg){

		if(msg.Estudia == true){Indicadores.Estudia++;}

		if(msg.Trabaja == true){Indicadores.Trabaja++;}

		console.log("Usuarios que estudia : " + Indicadores.Estudia + " Usuarios que trabaja : " + Indicadores.Trabaja );

		//Emite la informacion a todos los usuarios
		//Consulta el socket a ¡l que lo mando_____
		io.emit('information', Indicadores);

	});

	socket.on('disconnect',function(){
		console.log('Un usuario se ha desconectado!');
	});

});

//Puerto del servidor
http.listen(3000, function(){

  console.log('Servidor Activo en el puerto:3000');
});


