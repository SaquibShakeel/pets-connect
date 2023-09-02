import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

    return (
      <header className="flex justify-between sm:px-12 px-4 py-2 border-b">
        <h1 className='text-4xl'>PetsConnect</h1>
        <nav className="flex items-center">
        <button className="px-5 py-2 rounded shrink-0 text-white bg-tertiary outline-none border-none focus:outline-none cursor-pointer" 
            onClick={()=> {
              navigate("/api/auth/signin");
            }}
          >
            Sign In
          </button>
        </nav>
      </header>
    );
    }

export default Header;