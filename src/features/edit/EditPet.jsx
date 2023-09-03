import { useEffect, useState } from "react";
import axios from "axios";
import profile from "../../assets/profile.jpeg";
import ShowQRCode from "../../utils/ShowQRCode";
import {storage} from "../../utils/firebase";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

const EditPet = () => {
  const [pet, setPet] = useState(null);
  const [petName, setPetName] = useState("");
  const [imageInput, setImageInput] = useState(null);
  const [loading, setLoading] = useState(false);

  const path = window.location.pathname.split("/");
  const selectId = path[path.length - 1];

  const handleSave = async () => {
    try {
      setLoading(true);
      const temp = await imageChangeHandler();
      console.log(temp);
      const editPet = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/pets/edit`,
        {
          id: selectId,
          name: petName,
          image: temp,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(editPet?.data?.message);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };

  const imageChangeHandler = async () => {
    try {
      if (!imageInput) return pet.image;

      const storageRef = ref(storage, `images/${imageInput.name + Date.now()}`);
      await uploadBytes(storageRef, imageInput);
      const url = await getDownloadURL(storageRef);
      return url;

      // const formData = {
      //   image: imageInput,
      // };
      // const getImageUrl = await axios.post(
      //   `${import.meta.env.VITE_BASE_URL}/api/imageUrl`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      // return getImageUrl.data.url;
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/pets/${selectId}`)
      .then((res) => {
        setPet(res.data.pet);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!pet)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start sm:px-12 px-4 py-5 w-screen">
      <div className="p-2 rounded-full border-white border-[1px] inline-block relative">
        <img
          className="rounded-full w-40 h-40"
          src={
            imageInput ? URL.createObjectURL(imageInput) : pet?.image || profile
          }
          alt={pet?.name}
        />
        <input
          type="file"
          className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
          onChange={(e) => setImageInput(e.target.files[0])}
        />
      </div>
      <div className="w-full flex flex-col items-center justify-start">
        <input
          className="bg-transparent border-none outline-none text-5xl text-center w-[300px]"
          type="text"
          name="petName"
          id="petName"
          defaultValue={pet?.name}
          onChange={(e) => setPetName(e.target.value)}
        />
        <p>{pet?.owner?.name}</p>
        <p className="text-xs">Last seen: {pet?.lastSeen}</p>
        <h2 className="mt-2 self-start text-xl">Contact Owner</h2>
        <div className="w-full flex sm:items-center items-start justify-between sm:flex-row flex-col">
          <p>Email: {pet?.owner?.email}</p>
          <p>Contact: {pet?.owner?.contact}</p>
        </div>
        <h2 className="mt-2 self-start text-xl">Last Location</h2>
        <div className="flex md:flex-row flex-col items-center justify-between w-full">
          <div>Integrate Google map here</div>
          <ShowQRCode url={`https://pets-connect-pink.vercel.app/api/pets/${selectId}`} />
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-5">
        <button
          className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-5 py-2 border-none outline-none focus:outline-none"
          onClick={handleSave}
        >
          {loading ? "Loading..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditPet;
