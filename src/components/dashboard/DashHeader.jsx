import {useNavigate} from "react-router-dom";

const DashHeader = () => {

  const navigate = useNavigate();

    return (
      <header className="flex justify-between w-full sm:px-12 px-4 py-2 border-b">
        <h1 className="text-4xl">PetsConnect</h1>
        <nav className="flex items-center">
          <button
            className="px-5 py-2 rounded shrink-0 text-white bg-tertiary outline-none border-none focus:outline-none cursor-pointer"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Sign Out
          </button>
        </nav>
      </header>
    );
}

export default DashHeader;