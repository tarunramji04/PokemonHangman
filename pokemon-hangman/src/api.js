import axios from 'axios'

async function getPokemon(dex_no) {
  const result = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${dex_no}`)
  return result.data.name
}
  
async function randomPoke() {
  const dex_no = Math.floor(Math.random() * (1025 + 1));
  return await getPokemon(dex_no)
}
  
export { randomPoke };