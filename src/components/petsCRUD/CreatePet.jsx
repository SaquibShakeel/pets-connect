import { useState } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";

const CreatePet = (props) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/api/pets/create`;
      const response = await axios.post(
        url,
        {
          name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log({ response });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      props.handleClose();
    }
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="rounded-lg bg-tertiary shadow-lg fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-50 p-3">
      <div className="flex items-center justify-between">
        <h1 className="text-center">Add a new pet</h1>
        <IoClose
          className="text-2xl cursor-pointer"
          onClick={props.handleClose}
        />
      </div>
      <div className="flex flex-col my-2">
        <input
          type="text"
          className="mb-2 px-5 py-2 rounded border-none outline-none focus:outline-none bg-black-100"
          value={name}
          onChange={nameChangeHandler}
          placeholder="Name"
          required
        />
      </div>
      <div className="flex items-center justify-end">
        <button
          className="bg-teal-600 text-white hover:bg-teal-700 focus:outline-none outline-none border-none px-5 py-1 rounded"
          onClick={submitHandler}
        >
          {loading ? "Loading..." : "Add"}
        </button>
        <button
          className="text-white bg-gray-500 hover:bg-gray-600 focus:outline-none outline-none border-none px-5 py-1 rounded ml-1"
          onClick={props.handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CreatePet;
