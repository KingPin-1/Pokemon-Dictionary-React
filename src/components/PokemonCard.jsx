/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPokemonDetails } from "../helpers/loaders";
const PokemonCard = ({ data }) => {
  const id = data.id;
  const query = useQuery({
    queryKey: ["pokemons", id],
    queryFn: () => getPokemonDetails(id),
  });

  return (
    <Link
      to={`pokemon/${id}`}
      className="h-[250px] max-w-[200px] cursor-pointer rounded-lg border-[2px] border-black bg-slate-200 p-4  text-center text-xl shadow-[0px_5px_5px_0px_rgba(0,0,0,1)] hover:scale-105 hover:border-yellow-300 hover:font-bold dark:border-slate-400 dark:bg-gray-900 dark:text-yellow-300 dark:shadow-[0px_5px_5px_0px_rgba(255,255,255,0.2)]"
    >
      {query.isLoading && (
        <div className="flex h-full animate-pulse flex-col items-center justify-between p-2">
          <div className="h-[150px] w-[100px] rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="mt-2 h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>
      )}
      {query.isError && (
        <span className="text-xs font-semibold">{query.error.message}</span>
      )}
      {!query.isLoading && !query.isError && (
        <div className="flex h-full flex-col items-center justify-between p-2">
          <img
            src={query.data.sprites.front_default}
            className="h-[150px] w-[100px]"
            alt={query.data.name}
          />
          <h4>{query.data.name}</h4>
        </div>
      )}
    </Link>
  );
};

export default PokemonCard;
