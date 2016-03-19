/**
* author Elihu Alejandro Cruz Albores
* author Luis Angel Farelo Toldeo
* version 1.0
*/

//Funcion para obtencion de informacion de elemnto Form
var socket = io();

//Metodo de envio con Jquery
$('form').submit(function(){

	socket.emit('information',
		{
			"Estudia" :  document.getElementById('m').checked,
			"Trabaja" :  document.getElementById('s').checked
		});

	return false;
});

//Evento de Socket.io al recivir información
socket.on('information', function(data){

	var Graphic = data;
	console.log(Graphic);

	reactGraphic(Graphic.Trabaja,Graphic.Estudia);
});

function reactGraphic(Trabaja, Estudia){

	function getDatos(){

		return (
			{
				"Graphic" : [
					{
						"Dato" : "Trabaja",
						"data" : Trabaja
					},
					{
						"Dato" : "Estudia",
						"data" : Estudia
					}
				]
			}
		);
	}

	function getLS(Array){
		var index = 0;
		var Top = Array.length;
		var LS = 0;
		var Aciertos = 0;

		while(Aciertos != Top){

			Aciertos = 0;
			LS = 0;

			for(i = 0; i < Top; i++){
			
				if(Array[index].data >= Array[i].data){
					Aciertos++;
				}
			}
			LS = Array[index].data;
			index++;
		}
		return LS;
	}

	function doDraw(width,height){
		
		var Data   = getDatos().Graphic;
		var t      = Data.length;
		var Top    = getLS(Data);
		var canvas = document.getElementById('sketch');

		if (canvas.getContext){

			//Configuracion de Tabla
			var draw = canvas.getContext('2d');
			var Ancho = (width - 40) / t;

			//Fondo de Canvas
			draw.fillStyle = "white";
			draw.fillRect(0,0,500,500);

			for(i = 0; i < t ; i++){

				var info = Data[i].Dato;

				Position = ((Data[i].data * (height - 40)) / Top) * -1;

				CreateRect(Ancho, height, Position,i, draw, info);

			}
		}
		else {
		  alert("Su navegador no soporta Canvas :(");
		}
	}

	function CreateRect(Ancho, height, Position, index, canvas, info){

	  	canvas.fillStyle = "black";
	  	canvas.fillRect( 20 + (Ancho * index), height,Ancho - 40, Position + 20);
	  	canvas.fillStyle = "blue";
	  	canvas.fillRect( 40 + (Ancho * index), height,Ancho - 40, Position + 40);
	  	
	  	canvas.font = "bold 22px sans-serif";
		canvas.fillText(info,30 + (Ancho * index) ,30);
	}


	var Grafica = React.createClass({displayName: "Grafica",

		componentDidMount : function(){
			doDraw(520,500);
		},

		render : function(){
			
			return (

				React.createElement("section", {id: "Container", className: "text-center color_black"}, 
					React.createElement("canvas", {id: "sketch", width: "500px", height: "500px"})
				)
			);
		}
	});

	React.render(React.createElement(Grafica, null),document.getElementById('container'));
};
