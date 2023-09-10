// import { useLoaderData } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const { results: pokemons } = useLoaderData();
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
