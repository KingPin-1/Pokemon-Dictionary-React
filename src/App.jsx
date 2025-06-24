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

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && location.pathname.includes("/pokemon/")) {
        setIsSidebarOpen(true);
      } else if (mobile && isSidebarOpen) {
        // If switching to mobile view and sidebar was open, navigate to full page
        // This scenario might need adjustment based on desired UX
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, [location.pathname, isSidebarOpen]);

  useEffect(() => {
    if (!isMobile && location.pathname.includes("/pokemon/")) {
      setIsSidebarOpen(true);
    } else if (isMobile && isSidebarOpen) {
      // If on mobile and sidebar is "conceptually" open, ensure it's rendered as a page
      // This might involve navigating if the direct route isn't already PokemonDetails
      setIsSidebarOpen(false); // Sidebar is not a visual element on mobile
    } else if (!location.pathname.includes("/pokemon/")) {
        setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile, isSidebarOpen]);

  const toggleSidebar = (pokemonId) => {
    if (pokemonId && !isSidebarOpen && !isMobile) {
        navigate(`/pokemon/${pokemonId}`); // This will trigger the sidebar via useEffect
        setIsSidebarOpen(true);
    } else if (isSidebarOpen) {
        setIsSidebarOpen(false);
        navigate('/'); // Navigate to home when closing sidebar
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
