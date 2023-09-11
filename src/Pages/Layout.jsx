import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="font-mono flex h-screen w-full flex-col dark:text-white">
      <header className="bg-slate-200 p-4 text-center text-2xl sm:text-4xl font-semibold dark:bg-slate-800 ">
        POKEMON DICTIONARY
      </header>
      <main className="w-full grow overflow-auto dark:bg-slate-700">
        <Outlet />
      </main>
      <footer className="bg-slate-200 p-4 text-center font-semibold dark:bg-slate-800">
        Created with 💓 by{" "}
        <a
          className="text-violet-800 dark:text-green-400"
          href="https://github.com/KingPin-1/"
        >
          Mohd Athar
        </a>
      </footer>
    </div>
  );
};

export default Layout;
