// Interfaz requerida para realizar peticiones Ajax al servidor.
let ajax = new XMLHttpRequest();

ajax.onreadystatechange = procesarRespuesta;

function procesarRespuesta() {


	let capa = document.getElementById('salida');
	if (ajax.readyState == 4) {
		if (ajax.status == 200) {
			mostrarPokemon();
			return;
		}
		else {
			capa.innerHTML = "Error AJAX, no se puede obtener la lista";
		}
	}
}//cierra procesar respuesta
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

function mostrarPokemon() {

	let stats = "";
	let textJson = ajax.responseText;
	let types = "type: ";
	let abilidades = "<p>Abilities:</p><p>";
	let pokemon = JSON.parse(textJson);
	

	console.log(pokemon.id)
	if (pokemon.id < 650) { // comprobar que tiene imagen bonita si no pone el sprite

		imagen = "<img height='100%' src=" + pokemon.sprites.other.dream_world.front_default + ">";
	} else {
		imagen = "<img  height='100%' src=" + pokemon.sprites.front_default + ">";
	}
	document.getElementById("foto").innerHTML = imagen;
	nombre = "<h4>" + pokemon.name.toUpperCase() + " " + pokemon.base_experience + "xp</h4>";
	
	pokemon.stats.forEach(element => {
		
		console.log(element.stat.name + ": " + element.base_stat);
		stats += "<p>" + element.stat.name + ": " + element.base_stat + "</p>";
	});
	pokemon.types.forEach(element => {
		
		types += "<p>" + element.type.name + " </p> ";
	});
	pokemon.abilities.forEach(element => {
		console.log(element.ability.name)
		abilidades += element.ability.name + " ";
		
	});
	//asignaciones a elementos del DOM
	document.getElementById("nombre").innerHTML = nombre;
	document.getElementById("abilities").innerHTML = abilidades + "</p>";
	document.getElementById("stats").innerHTML = stats;
	document.getElementById("types").innerHTML = types;
}