/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const PokemonCard = ({ data }) => {
  return (
    <Link
      to={`pokemon/${data.id}`}
      className="w-full cursor-pointer rounded-lg border-[2px] border-black  bg-slate-200 p-4 text-center text-xl hover:scale-105 hover:border-yellow-300 hover:font-bold dark:border-slate-400 dark:bg-black dark:text-yellow-300"
    >
      {data.name}
    </Link>
  );
};

export default PokemonCard;
