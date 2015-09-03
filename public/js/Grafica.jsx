/**
* @ author Elihu Alejandro Cruz Albores
* @ version 1.0
*/
var FileName = "http://localhost/ReactJS/json/grafica.json"

/*
function getDatos (){
    return  (function () {//Petición a servidor para JSON con datos

        var JSON = null;
        $.ajax({
            'async': false,
            'global': false,
            'type' : "POST",
            'url': FileName,
            'dataType': "json",
            'success': function (data) {
                JSON = data;
            }
        });
        return JSON;
    })();
};
*/

function getDatos(){
	return (
		{
			"Graphic" : [
				{
					"Dato" : "Aprovados",
					"data" : 25
				},
				{
					"Dato" : "Extra",
					"data" : 2
				},
				{
					"Dato" : "Reprovados",
					"data" : 35
				},
				{
					"Dato" : "Pendientes",
					"data" : 5
				},
				{
					"Dato" : "Noobs",
					"data" : 45
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
		var Ancho = (width - 40) /  t;

//Fondo de Canvas
		draw.fillStyle = "white";
		draw.fillRect(0,0,500,500);

//Fondo de Grafica
		draw.fillStyle = "gray";
		draw.fillRect(20,0,500,480);

		for(i = 0; i < t ; i++){

			Position = ((Data[i].data * (height - 40)) / Top) * -1;

			CreateRect(Ancho, height, Position,i, draw);

		}
	}
	else {
	  alert("Su navegador no soporta Canvas :(");
	}
}

function CreateRect(Ancho, height, Position, index, canvas){

  	canvas.fillStyle = "blue";
  	canvas.fillRect((Ancho * index) + 20, height - 20 ,Ancho - 3, Position);

}


var Grafica = React.createClass({

	componentDidMount : function(){
		doDraw(520,500);
	},

	render : function(){

		return (

			<section id = "Container" >
				<canvas id = "sketch" width = "500px" height = "500px"></canvas>
			</section>
		);
	}
})

React.render(<Grafica />,document.getElementById('mi_div'));