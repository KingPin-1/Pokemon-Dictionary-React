import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen w-full flex-col font-mono dark:text-white">
      <header className="bg-slate-200 p-4 text-center text-4xl font-semibold dark:bg-slate-800 ">
        POKEMON APP
      </header>
      <main className="w-full grow overflow-auto bg-slate-700">
        <Outlet />
      </main>
      <footer className="bg-slate-200 p-4 text-center font-semibold dark:bg-slate-800">
        Created with 💓 by Mohd Athar
      </footer>
    </div>
  );
};

export default Layout;
