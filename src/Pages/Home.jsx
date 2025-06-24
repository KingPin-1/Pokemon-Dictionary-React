import { useEffect, useRef } from "react";
import PokemonCard from "../components/PokemonCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemons } from "../helpers/loaders";
import { Link, useOutletContext, useNavigate } from "react-router-dom";

const Home = () => {
  const outletContext = useOutletContext();
  const navigate = useNavigate();

  // Defensively check if context is available
  if (!outletContext) {
    console.error("Error: Outlet context is not available in Home.jsx.");
    // Render a fallback UI or return null to prevent crashing
    // This indicates a problem with how Home is rendered or how context is provided.
    return (
      <div className="rounded-lg p-8 text-4xl text-red-500">
        Critical Error: Application context not loaded. Please check console.
      </div>
    );
  }

  const { toggleSidebar, isMobile } = outletContext;

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

  /**
   * @effect
   * Sets up an IntersectionObserver to implement infinite scrolling.
   * When the last Pokemon card (tracked by `lastPokemonElementRef`) becomes visible in the viewport,
   * it triggers `fetchNextPage` to load more Pokemon, provided there are more pages (`hasNextPage`)
   * and a fetch isn't already in progress (`isFetchingNextPage`).
   * The observer is disconnected when the component unmounts or dependencies change.
   */
  useEffect(() => {
    if (isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Check if the observed element is intersecting and there's a next page.
        if (entries && entries.length > 0 && entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }, // Trigger when 100% of the element is visible.
    );

    // Observe the last Pokemon element if it exists.
    if (lastPokemonElementRef.current) {
      observer.observe(lastPokemonElementRef.current);
    }
    observerRef.current = observer; // Store the observer instance for cleanup.

    // Cleanup function: disconnect the observer when the effect re-runs or component unmounts.
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isFetchingNextPage, fetchNextPage, hasNextPage, data]); // Dependencies for the effect.

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

  /**
   * Handles click events on Pokemon cards.
   * If the view is mobile, it navigates to the Pokemon's detail page.
   * If the view is desktop, it calls `toggleSidebar` to show the Pokemon's details in the sidebar.
   * @param {string} pokemonName - The name of the clicked Pokemon.
   */
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
