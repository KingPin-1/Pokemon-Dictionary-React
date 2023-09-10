import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import PokemonDetails from "./Pages/PokemonDetails";
import { getPokemonDetails, fetchPokemons } from "./helpers/loaders";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: () => fetchPokemons(),
        },
        {
          path: "pokemon/:pokemonId",
          element: <PokemonDetails />,
          loader: ({ params }) => getPokemonDetails(params.pokemonId),
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
