export const getPokemonDetails = async (id) => {
  const results = (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  ).json();
  return results;
};

export const fetchPokemons = async ({
  pageParam = "https://pokeapi.co/api/v2/pokemon?limit=20",
}) => {
  const results = (await fetch(pageParam)).json();
  return results;
};
