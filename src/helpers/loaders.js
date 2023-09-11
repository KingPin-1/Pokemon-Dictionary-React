export const getPokemonDetails = async (id) => {
  const results = (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  ).json();
  return results;
};

export const fetchPokemons = async () => {
  const results = (
    await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50`)
  ).json();
  return results;
};
