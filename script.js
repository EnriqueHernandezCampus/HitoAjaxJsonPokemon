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
function randomPokemon() {
	let aleatorio = Math.floor(Math.random() * (898 - 1) + 1);
	console.log("aleatorio " + aleatorio)
	ajax.open("GET", "https://pokeapi.co/api/v2/pokemon/" + aleatorio);
	ajax.send();
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

	let stats = "";
	let textJson = ajax.responseText;
	let types = "type: ";
	let abilidades = "<p>Abilities:</p><p>";
	let obj = JSON.parse(textJson);
	

	console.log(obj.id)
	if (obj.id < 650) { // comprobar que tiene imagen bonita si no pone el sprite

		salida = "<img height='100%' src=" + obj.sprites.other.dream_world.front_default + ">";
	} else {
		salida = "<img  height='100%' src=" + obj.sprites.front_default + ">";
	}
	document.getElementById("foto").innerHTML = salida;
	nombre = "<h4>" + obj.name.toUpperCase() + " " + obj.base_experience + "xp</h4>";
	document.getElementById("nombre").innerHTML = nombre;

	obj.stats.forEach(element => {

		console.log(element.stat.name + ": " + element.base_stat);
		stats += "<p>" + element.stat.name + ": " + element.base_stat + "</p>";
	});
	obj.types.forEach(element => {

		//console.log(element.type.name);
		types += "<a href=" + element.type.url + ">" + element.type.name + " </a> ";
		//types += "<a href=www.google.com>"  + element.type.name + " </a>";
	});
	obj.abilities.forEach(element => {
		console.log(element.ability.name)
		abilidades += element.ability.name + " ";

	});
	/*obj.types.forEach(element => {
		botones += "<button src =" + element.type.url + ">" + element.type.name + "</button>";
		console.log(element.type.url);

	});
*/	console.log(document.getElementById("abilities"));

	document.getElementById("abilities").innerHTML = abilidades + "</p>";
	document.getElementById("stats").innerHTML = stats;
	document.getElementById("types").innerHTML = types;
	//document.getElementById("buttons").innerHTML = botones;


}
// function funcionPrueba() {
// 	console.log("toggle details");
// 	var x = document.getElementById("extendido");
// 	if (x.style.display === "none") {
// 		x.style.display = "inline-block";
// 	} else {
// 		x.style.display = "none";
// 	}
// 	// let textJson = ajax.responseText;
// 	// let obj = JSON.parse(textJson);
// 	// obj.types.forEach(element => {
// 	// 	console.log(element.type.url);
		
// 	// });
// 	// console.log("funcion prueba"+ obj.name);

// 	/*obj.types.forEach(element => {
// 		botones+="<button>"+element.type.name+"</button>"
// 		console.log(element.type.url);
		
// 	});*/
	
// }
