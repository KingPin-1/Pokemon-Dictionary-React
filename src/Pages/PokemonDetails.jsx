import { useLoaderData } from "react-router-dom";

const PokemonDetails = () => {
  const data = useLoaderData();
  return (
    <div className="flex h-full w-full items-center justify-center p-12">
      <figure className="max-w-lg">
        <img
          className="h-[400px] rounded-lg"
          src={data.sprites.front_shiny}
        />
        <figcaption className="mt-2 text-center text-xl">
          {data.name}
        </figcaption>
      </figure>
    </div>
  );
};

export default PokemonDetails;
