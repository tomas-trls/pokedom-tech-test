import pokemonArray from "./data/pokemon.js";
let cardContainer = document.querySelector(".card-container");
let searchBar = document.querySelector("#searchBar");
let limit = document.querySelector("#searchLimit");
let checkboxes = document.querySelectorAll(".checkbox");

const renderCard = (pokemon) => {
  return `
                            <div class="card">
                              <img src="${
                                pokemon.sprite
                              }" alt="image" class="card__image" />
                              <section class="card__content">
                                <h2 class="card__heading">${
                                  pokemon.name.charAt(0).toUpperCase() +
                                  pokemon.name.slice(1)
                                }</h2>
                                <p class="card__text">${
                                  pokemon.name.charAt(0).toUpperCase() +
                                  pokemon.name.slice(1)
                                }
                                  (#${pokemon.id})
                                is a ${pokemon.types.join(" & ")}
                                type pokemon.</p>
                              </section>
                            </div>
                            `;
};

const populatePokis = (pokiArr, limit = 151) => {
  let arr = [];
  pokiArr.map((pokemon) => {
    arr.push(renderCard(pokemon));
  });
  cardContainer.innerHTML = arr.slice(0, limit).join("");
};

const handleLimit = (event) => {
  let limitValue;
  if (!event || !event.target.value) {
    populatePokis(pokemonArray, 151);
  } else {
    limitValue = parseInt(event.target.value);
    populatePokis(pokemonArray, limitValue);
  }
};

const handleSearch = (event) => {
  let prompt = event.target.value.toLowerCase();
  let searchArr = pokemonArray.filter((pokemonName) => {
    return pokemonName.name.toLowerCase().includes(prompt);
  });
  populatePokis(searchArr);
};

const handleTypesCheckboxes = (event) => {
  let checkedArr = [];
  if (event.target.checked) {
    pokemonArray.map((pokemon) => {
      pokemon.types.filter((type) => {
        if (type.toLowerCase().includes(event.target.value.toLowerCase())) {
          checkedArr.push(pokemon);
        }
      });
    });
    populatePokis(checkedArr);
  } else {
    populatePokis(pokemonArray);
  }
};

handleLimit();

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", handleTypesCheckboxes);
});

limit.addEventListener("input", handleLimit);
searchBar.addEventListener("input", handleSearch);
