import { useQuery } from "@tanstack/react-query";
import { getPokemonDetails } from "../helpers/loaders";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const PopulateStats = ({ filteredStats }) => {
  return (
    <section>
      <h2 className="font font-semibold">Stats</h2>
      <ul className="mt-2 px-12">
        {filteredStats.map((stat, i) => (
          <li key={i} className="flex justify-between gap-4 ">
            <div>{stat.name}</div>
            <div>{stat.base}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

const PopulateAbilities = ({ filteredAbilities }) => {
  return (
    <section>
      <h2 className="font font-semibold">Abilities</h2>
      <ul className="mt-2 grid grid-cols-2 gap-2 px-12">
        {filteredAbilities.map((item, i) => (
          <li
            key={i}
            className="rounded-md border border-black px-4 py-2 text-sm dark:border-white"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};

const PokemonDetails = ({ isSidebar, toggleSidebar }) => {
  const { pokemonId } = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      window.scrollTo(top);
    }
  }, [isMobile]);

  const query = useQuery({
    queryKey: ["pokemons", pokemonId],
    queryFn: () => getPokemonDetails(pokemonId),
  });

  if (query.isLoading) {
    return <div className="rounded-lg p-8 text-4xl">Loading...</div>;
  }

  if (query.isError) {
    return (
      <div className="rounded-lg p-8 text-4xl">
        Error Encountered...{query.error.message}
      </div>
    );
  }

  const { abilities, name, sprites, stats } = query.data;
  const filteredStats = stats.map((stat) => ({
    name: stat.stat.name,
    base: stat.base_stat,
  }));
  const filteredAbilities = abilities.map((item) => item.ability.name);

  const handleClose = () => {
    if (isSidebar) {
      toggleSidebar();
    } else {
      navigate("/");
    }
  };

  const detailsContent = (
    <>
      <section className="sm:min-h-none flex min-h-[calc(100vh-15rem)] w-full flex-col items-center gap-10 sm:max-w-[40%]">
        <h1 className="font-plex text-3xl font-semibold">
          {name.toUpperCase()}
        </h1>
        <img
          className="h-[250px] rounded-lg xl:h-[350px]"
          src={sprites.other.dream_world.front_default}
          alt={name}
        />
      </section>
      <section className="font-serif flex min-w-[350px] flex-col gap-8 py-4 text-center text-xl">
        <PopulateStats filteredStats={filteredStats} />
        <PopulateAbilities filteredAbilities={filteredAbilities} />
      </section>
    </>
  );

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center px-2 py-8 sm:flex-row sm:justify-evenly sm:p-12 lg:mx-auto lg:w-3/4">
        {detailsContent}
      </div>
    );
  }

  return (
    <div
      className={`fixed right-0 top-0 z-50 h-full w-full transform bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out dark:bg-gray-800 md:w-1/3 ${
        isSidebar ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={handleClose}
        className="absolute right-4 top-4 rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="mt-8 flex flex-col items-center justify-center">
        {detailsContent}
      </div>
    </div>
  );
};

export default PokemonDetails;
