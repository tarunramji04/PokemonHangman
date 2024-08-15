import axios from 'axios'

export async function randomPoke(not_allowed) {
  let dex_no = Math.floor(Math.random() * (1025 + 1));
  if (not_allowed.length < 1025) {
    while (not_allowed.includes(dex_no)) {
      dex_no = Math.floor(Math.random() * (1025 + 1));
    }
  }
  return await getPokemon(dex_no);
}

async function getPokemon(dex_no) {
  const result = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${dex_no}`);
  const name = result.data.name;
  const image = getPokemonImage(dex_no);
  return {name, image, dex_no};
}

export function getPokemonImage(dex_no) {
  const threeDigitDex = getThreeDigits(dex_no);
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${threeDigitDex}.png`;
}

function getThreeDigits(num) {
  const numDigitsLength = String(num).length;

  if (numDigitsLength === 1) {
    return '00' + num;
  }
  if (numDigitsLength === 2) {
    return '0' + num;
  }

  return String(num);
}
