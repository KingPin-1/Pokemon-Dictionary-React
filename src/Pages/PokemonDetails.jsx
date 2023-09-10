/* eslint-disable react/prop-types */
import { useLoaderData } from "react-router-dom";

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

const PokemonDetails = () => {
  const { abilities, name, sprites, stats } = useLoaderData();
  const filteredStats = stats.map((stat) => ({
    name: stat.stat.name,
    base: stat.base_stat,
  }));
  const filteredAbilities = abilities.map((item) => item.ability.name);
  console.log(filteredStats);
  return (
    <div className="justify-center px-2 py-8 sm:mx-auto sm:flex lg:w-3/4 sm:justify-evenly sm:p-12">
      <section className="sm:min-h-none mx-auto flex min-h-[calc(100vh-15rem)] w-full flex-col items-center gap-10 max-w-[40%]">
        <h1 className="font-plex text-3xl font-semibold">
          {name.toUpperCase()}
        </h1>
        <img
          className="h-[250px] rounded-lg xl:h-[350px]"
          src={sprites.other.dream_world.front_default}
        />
      </section>
      <section className="flex grow flex-col gap-8 py-4 text-center font-serif text-xl md:max-w-[40%]">
        <PopulateStats filteredStats={filteredStats} />
        <PopulateAbilities filteredAbilities={filteredAbilities} />
      </section>
    </div>
  );
};

export default PokemonDetails;
