import axios from "axios";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import PetCard from "../PetCard";
import CreatePet from "../petsCRUD/CreatePet";
import BackDrop from "../BackDrop";

const DashWelcome = () => {

  const [petsData, setPetsData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const redirectHandler = (id) => {
    navigate(`/api/pets/edit/${id}`);
  };

    useEffect(() => {
      const getPets = async () => {
        try {
          const petsFromServer = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/pets`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setPetsData(petsFromServer?.data?.pets);
        }
        catch (error) {
          console.log(error);
        }
      }
      getPets();
    }, [show]);
    

    return (
      <div className="sm:px-12 px-4 py-5 w-full min-h-[80vh]">
        <h1>Welcome to your Dashboard!</h1>
        <p>
          Here you can view your account information and manage your listings.
        </p><br />
        <button className="rounded bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 my-1 focus:outline-none outline-none border-none" onClick={handleShow}>+ New Pet</button>
        {show ? ReactDOM.createPortal(
          <BackDrop handleClose={handleClose}/>, document.getElementById("backdrop")) : null}
        {show ? ReactDOM.createPortal(
          <CreatePet handleClose={handleClose}/>, document.getElementById("modal")) : null}
        <div className="flex flex-wrap justify-center items-start">
          {petsData.length !=0 ? petsData.map((pet) => (
            <PetCard pet={pet} key={pet.id} onClick={()=> {
              redirectHandler(pet.id);
            }} />
          )): <h1 className="text-2xl font-bold">Add your pets to get started</h1>}
        </div>
      </div>
    );
    };

export default DashWelcome;