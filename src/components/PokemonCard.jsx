/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const PokemonCard = ({ data }) => {
  return (
    <Link
      to={`pokemon/${data.id}`}
      className="w-full cursor-pointer bg-black p-4 text-xl dark:text-white"
    >
      {data.name}
    </Link>
  );
};

export default PokemonCard;
