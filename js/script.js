// variáveis
const pokemonName = document.querySelector(".pokemon__name");
const pokemonId = document.querySelector(".pokemon__id");
const pokemonImage = document.querySelector(".pokemon__image");

// form
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const buttonPrev = document.querySelector(".button__prev");
const buttonNext = document.querySelector(".button__next");

// inicia com o pokemon
let searchPokemon = 1;

// consumo da API

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();

    return data;
  }
};

const renderPokemon = async (pokemon) => {

  /* pokemonName.innerHTML = "Loading...";
  pokemonId.innerHTML = ""; */

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    pokemonName.innerHTML = data.name;
    pokemonId.innerHTML = "#" + data.id;
    input.value = "";
    searchPokemon = data.id;
  } else {
    pokemonImage.src =
      "https://cdn-icons-png.flaticon.com/512/3585/3585596.png";
    pokemonName.innerHTML = "Not found";
    pokemonId.innerHTML = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
