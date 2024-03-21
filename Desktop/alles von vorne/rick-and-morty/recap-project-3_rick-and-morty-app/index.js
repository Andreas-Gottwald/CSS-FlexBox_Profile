import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";

export const cardContainer = document.querySelector(
  '[data-js="card-container"]'
);
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 42;
let page = 1;
let searchQuery = "";

export async function fetchCharacters() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
  );
  const data = await response.json();
  cardContainer.innerHTML = "";
  return data.results;
}

const data = await fetchCharacters();

data.forEach((person) => {
  CharacterCard(
    person.image,
    person.name,
    person.status,
    person.species,
    person.episode.length
  );
});

async function renderCards() {
  await fetchCharacters();
  const newPersons = await fetchCharacters();
  newPersons.forEach((person) => {
    CharacterCard(
      person.image,
      person.name,
      person.status,
      person.species,
      person.episode.length
    );
  });
  console.log(newPersons);
}

renderCards();

nextButton.addEventListener("click", () => {
  if (page == maxPage) return;
  page++;
  renderCards();
  pagination.textContent = `${page}/${maxPage}`;
});

prevButton.addEventListener("click", () => {
  if (page == 1) return;
  page--;
  renderCards();
  pagination.textContent = `${page}/${maxPage}`;
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  searchQuery = data.query;
  renderCards();
  page = 1;
  pagination.textContent = `${page}/${maxPage}`;
  console.log(data.query);
});

// const cardContainer = document.querySelector('[data-js="card-container"]');
// const searchBar = document.querySelector('[data-js="search-bar"]');
// const nextButton = document.querySelector('[data-js="button-next"]');
// const prevButton = document.querySelector('[data-js="button-prev"]');
// const pagination = document.querySelector('[data-js="pagination"]');

// let page = 1;
// let searchQuery = "";

// async function fetchCharacters() {
//   const response = await fetch(
//     `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
//   );
//   const { results } = await response.json();
//   return results;
// }

// async function renderCards() {
//   const characters = await fetchCharacters();
//   cardContainer.innerHTML = "";
//   characters.forEach((character) => {
//     const card = document.createElement("div");
//     card.classList.add("character-card");
//     card.innerHTML = `
//       <img src="${character.image}" alt="${character.name}">
//       <h3>${character.name}</h3>
//       <p>Status: ${character.status}</p>
//       <p>Species: ${character.species}</p>
//       <p>Episodes: ${character.episode.length}</p>
//     `;
//     cardContainer.appendChild(card);
//   });
//   pagination.textContent = `${page}`;
// }

// renderCards();

// nextButton.addEventListener("click", async () => {
//   page++;
//   await renderCards();
// });

// prevButton.addEventListener("click", async () => {
//   if (page > 1) {
//     page--;
//     await renderCards();
//   }
// });

// searchBar.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   const formData = new FormData(event.target);
//   const data = Object.fromEntries(formData);
//   searchQuery = data.query.trim();
//   page = 1;
//   await renderCards();
// });
