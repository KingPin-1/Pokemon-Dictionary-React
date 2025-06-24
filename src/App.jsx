import { createBrowserRouter, RouterProvider, Outlet, useLocation, useNavigate } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import PokemonDetails from "./Pages/PokemonDetails";
import { useState, useEffect } from "react";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * @effect
   * Handles window resize events to adjust the layout.
   * Sets `isMobile` state based on window width.
   * Manages sidebar visibility:
   * - Opens sidebar on desktop if viewing a Pokemon detail page.
   * - Closes sidebar if switching to mobile view while it was open.
   */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && location.pathname.includes("/pokemon/")) {
        setIsSidebarOpen(true);
      } else if (mobile && isSidebarOpen) {
        // If switching to mobile view and sidebar was open, close it.
        // The PokemonDetails page will be the main view on mobile.
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on component mount

    return () => window.removeEventListener("resize", handleResize);
  }, [location.pathname, isSidebarOpen]); // Reruns if path changes or sidebar state changes.

  /**
   * @effect
   * Manages sidebar visibility based on route changes and mobile status.
   * - Opens sidebar on desktop when navigating to a Pokemon detail page.
   * - Closes sidebar on mobile if it was conceptually open.
   * - Closes sidebar if navigating away from a Pokemon detail page on desktop.
   */
  useEffect(() => {
    if (!isMobile && location.pathname.includes("/pokemon/")) {
      setIsSidebarOpen(true);
    } else if (isMobile && isSidebarOpen) {
      // On mobile, the sidebar concept isn't used; PokemonDetails is a full page.
      // Ensure isSidebarOpen is false if user switches to mobile or if it was true.
      setIsSidebarOpen(false);
    } else if (!location.pathname.includes("/pokemon/")) {
      // If not on a pokemon detail path, ensure sidebar is closed.
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile, isSidebarOpen]); // Dependencies for this effect.

  /**
   * Toggles the sidebar visibility or navigates based on the current state.
   * - If a `pokemonId` is provided, not on mobile, and sidebar is closed:
   *   navigates to the Pokemon's detail page, which in turn triggers the sidebar.
   * - If the sidebar is currently open:
   *   closes the sidebar and navigates to the home page.
   * @param {string} [pokemonId] - The ID of the Pokemon to display in the sidebar.
   *                               If undefined, and sidebar is open, it will close the sidebar.
   */
  const toggleSidebar = (pokemonId) => {
    if (pokemonId && !isSidebarOpen && !isMobile) {
        // Navigate to the pokemon's page; useEffect will handle opening the sidebar.
        navigate(`/pokemon/${pokemonId}`);
        setIsSidebarOpen(true); // Explicitly set sidebar open
    } else if (isSidebarOpen) {
        // If sidebar is open, close it and navigate to home.
        setIsSidebarOpen(false);
        navigate('/');
    }
  };


  return (
    <Layout>
      <Outlet context={{ toggleSidebar, isMobile }} />
      {!isMobile && isSidebarOpen && location.pathname.includes("/pokemon/") && (
        <PokemonDetails isSidebar={true} toggleSidebar={toggleSidebar} />
      )}
    </Layout>
  );
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          // This route is for mobile view or direct navigation
          path: "pokemon/:pokemonId",
          element: <PokemonDetails isSidebar={false} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
