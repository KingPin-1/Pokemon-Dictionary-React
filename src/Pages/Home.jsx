import { useEffect, useRef } from "react";
import PokemonCard from "../components/PokemonCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemons } from "../helpers/loaders";
import { Link, useOutletContext, useNavigate } from "react-router-dom";

const Home = () => {
  const { toggleSidebar, isMobile } = useOutletContext();
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["pokemons"],
    getNextPageParam: (lastPage) => lastPage.next,
    queryFn: fetchPokemons,
  });

  const observerRef = useRef();
  const lastPokemonElementRef = useRef();

  useEffect(() => {
    if (isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries && entries.length > 0 && entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (lastPokemonElementRef.current) {
      observer.observe(lastPokemonElementRef.current);
    }
    observerRef.current = observer; // Store the observer instance

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect(); // Use the stored instance
      }
    };
  }, [isFetchingNextPage, fetchNextPage, hasNextPage, data]); // Added data to dependencies

  if (isLoading && !data) { // Ensure data is not present before showing initial loader
    return <div className="rounded-lg p-8 text-4xl">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg p-8 text-4xl">
        Error Encountered...{error.message}
      </div>
    );
  }

  const allPokemons = data?.pages.flatMap((page) => page.results) || [];

  const handlePokemonClick = (pokemonName) => {
    if (isMobile) {
      navigate(`pokemon/${pokemonName}`);
    } else {
      toggleSidebar(pokemonName);
    }
  };

  return (
    <div className="relative mx-auto grid w-3/4 grid-cols-1 place-items-center gap-4 py-8 sm:grid-cols-2 md:grid-cols-3 md:gap-8 xl:grid-cols-4 [&>*]:w-full">
      {allPokemons.map((pokemon, index) => {
        const id = pokemon.url
          .split("/")
          .filter((item) => item != "")
          .at(-1);

        const cardContent = <PokemonCard data={{ id: id, ...pokemon }} />;

        if (allPokemons.length === index + 1) {
          return (
            <div
              ref={lastPokemonElementRef}
              key={pokemon.name}
              onClick={() => handlePokemonClick(pokemon.name)}
              className={isMobile ? "" : "cursor-pointer"}
            >
              {isMobile ? <Link to={`pokemon/${pokemon.name}`}>{cardContent}</Link> : cardContent}
            </div>
          );
        } else {
          return (
            <div
              key={pokemon.name}
              onClick={() => handlePokemonClick(pokemon.name)}
              className={isMobile ? "" : "cursor-pointer"}
            >
              {isMobile ? <Link to={`pokemon/${pokemon.name}`}>{cardContent}</Link> : cardContent}
            </div>
          );
        }
      })}
      {isFetchingNextPage && (
        <div className="col-span-full mt-4 flex justify-center text-2xl">
          Loading more...
        </div>
      )}
      {!hasNextPage && !isFetchingNextPage && allPokemons.length > 0 && (
         <div className="col-span-full mt-4 flex justify-center text-xl text-gray-500">
           No more Pokemon to load.
         </div>
      )}
    </div>
  );
};

export default Home;
