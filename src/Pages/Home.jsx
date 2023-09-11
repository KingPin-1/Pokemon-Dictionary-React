import PokemonCard from "../components/PokemonCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemons } from "../helpers/loaders";

const Home = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
  });

  if (isLoading) {
    return <div className="rounded-lg p-8 text-4xl">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg p-8 text-4xl">
        Error Encountered...{error.message}
      </div>
    );
  }

  const pokemons = data.results;
  return (
    <div className="mx-auto grid w-3/4 grid-cols-1 place-items-center gap-4 py-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 [&>*]:w-full">
      {pokemons.map((pokemon, index) => {
        const id = pokemon.url
          .split("/")
          .filter((item) => item != "")
          .at(-1);
        return <PokemonCard key={index} data={{ id: id, ...pokemon }} />;
      })}
    </div>
  );
};

export default Home;
