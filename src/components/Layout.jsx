import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="w-full min-h-screen bg-primary">
      <Header />
      <Outlet />
      <footer className="flex justify-start items-center w-full sm:px-12 px-4 py-5">
        Public footer
      </footer>
    </div>
  );
};

export default Layout;
