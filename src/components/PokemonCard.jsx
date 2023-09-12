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
        <svg
          aria-hidden="true"
          className="mx-auto h-6 w-6 animate-spin fill-yellow-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
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
