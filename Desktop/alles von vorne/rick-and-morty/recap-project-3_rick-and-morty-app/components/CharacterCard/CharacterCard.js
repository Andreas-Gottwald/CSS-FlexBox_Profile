import { cardContainer } from "../../index.js";
export function CharacterCard(imgUrl, title, status, type, occurrences) {
  const card = document.createElement("li");
  card.innerHTML = `<div class="card__image-container">
    <img
      class="card__image"
      src="${imgUrl}"
      alt="${title}"
    />
    <div class="card__image-gradient"></div>
  </div>
  <div class="card__content">
    <h2 class="card__title">${title}</h2>
    <dl class="card__info">
      <dt class="card__info-title">Status</dt>
      <dd class="card__info-description">${status}</dd>
      <dt class="card__info-title">Race</dt>
      <dd class="card__info-description">${type}</dd>
      <dt class="card__info-title">Occurrences</dt>
      <dd class="card__info-description">${occurrences}</dd>
    </dl>
  </div>`;
  card.classList.add("card");
  cardContainer.append(card);
  return card;
}
