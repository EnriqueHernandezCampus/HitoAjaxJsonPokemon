// Interfaz requerida para realizar peticiones Ajax al servidor.
let ajax = new XMLHttpRequest();

ajax.onreadystatechange = procesarRespuesta;

function procesarRespuesta() {


	let capa = document.getElementById('salida');
	if (ajax.readyState == 4) {
		if (ajax.status == 200) {
			mostrarLista();
			return;
		}
		else {
			capa.innerHTML = "Error AJAX, no se puede obtener la lista";
		}
	}
}
function peticionLista() {

	ajax.open("GET", "https://pokeapi.co/api/v2/pokemon/" + document.getElementById("pokemon").value);
	ajax.send();

}
function loadLista() {

	ajax.open("GET", "https://pokeapi.co/api/v2/pokemon/1");
	ajax.send();

}
function mostrarLista() {

	//	var i;
	let stats="";
	let textJson = ajax.responseText;
	let types="type: ";
	//var table = "<tr><th>Portada</th><th>Título</th><th>Artista</th><th>Álbum</th><th>Fecha lanzamiento</th><th>Duración</th></tr>";
	let obj = JSON.parse(textJson);
	
	salida = "<img width = '300px' src=" + obj.sprites.front_default + ">";
	document.getElementById("foto").innerHTML = salida;
	nombre = "<h4>" + obj.name.toUpperCase() + "</h4>";
	document.getElementById("nombre").innerHTML = nombre;
	obj.stats.forEach(element => {

		console.log(element.stat.name+": "+element.base_stat);
		stats+="<p>"+element.stat.name+": "+element.base_stat+"</p>";
		
		
	});
	obj.types.forEach(element => {

		console.log(element.type.name);
		types+="<p>- "+element.type.name+"</p>";
		
		
	});
	document.getElementById("stats").innerHTML = stats;
	document.getElementById("types").innerHTML = types;


}