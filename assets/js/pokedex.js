

function fetchPokemon(endpoint, id_pokemon){
  fetch(`https://pokeapi.co/api/v2/${endpoint}/${id_pokemon}`)
    .then((request) => request.json())
    .then((data) => {
      console.log(data);
      printPokemon(data)
    })
    
}
const printPokemon = (pokemon) =>{
  document.querySelector("#pokeImage").src = pokemon.sprites.other.home.front_default;
  const features = document.querySelectorAll(".features-item");
  features[0].innerHTML = (pokemon.weight * 0.1).toFixed(2) + " kg";
  features[1].innerHTML = (pokemon.height * 0.1).toFixed(2) + " m";
  const abilities = pokemon.abilities;
  document.querySelector("h2").innerHTML = pokemon.id.toString().padStart(3, '0') + " " + pokemon.name ;
  abilities.forEach((pokemon) => {
    let span = document.createElement("span");
    span.innerHTML = pokemon.ability.name;
    document.querySelector("h2").appendChild(span)
  });
  
  document.querySelector("#hp").innerHTML = "<b><i></i> HP </b>"+pokemon.stats[0].base_stat;
  document.querySelector("#speed").innerHTML = "<i class='speed'></i>"+pokemon.stats[1].base_stat;
  document.querySelector("#attack").innerHTML = "<i class='attack'></i>"+pokemon.stats[2].base_stat;
  document.querySelector("#defense").innerHTML = "<i class='defense'></i>"+pokemon.stats[3].base_stat;
  document.querySelector("#sa").innerHTML = "<i class='special-attack'></i>"+pokemon.stats[4].base_stat;
  document.querySelector("#sd").innerHTML = "<i class='special-defense'></i>"+pokemon.stats[5].base_stat;
}

let id_counter = 0;
const next = document.querySelector(".next");
  next.onclick = () =>{
    next.classList.add("pressed-button");
    let switch_light = document.getElementById("switch_light");
    switch_light.classList.add("on")
    setTimeout(()=>{
      next.classList.remove("pressed-button"); 
    },200)
    setTimeout(()=>{
      switch_light.classList.remove("on")
    },750)
    id_counter++;
    id_counter >= 1125 ? id_counter = 0 : fetchPokemon("pokemon", id_counter);
}

const prev = document.querySelector(".prev");
  prev.onclick = () =>{
    let switch_light = document.getElementById("switch_light");
    switch_light.classList.add("on")
    prev.classList.add("pressed-button")
    setTimeout(()=>{
      prev.classList.remove("pressed-button")
    },200)
    setTimeout(()=>{
      switch_light.classList.remove("on")
    },750)
    id_counter--; 
    id_counter >= 1 ? fetchPokemon("pokemon", id_counter) : id_counter = 1;
}

const body = document.querySelector(".pokedex")
flag = true;
body.onclick =()=>{
 
  if (flag == true) {
    const top_cover = document.querySelector(".pokedex--cover_top")
    top_cover.classList.add("pokedex-cover_top_animation")
    const bottom_cover = document.querySelector(".pokedex--cover_bottom")
    bottom_cover.classList.add("pokedex-cover_bottom_animation");
    setTimeout(()=>{
      document.getElementById("pokeImage").src = "";
    },3000)
  }
  flag = false;
}
