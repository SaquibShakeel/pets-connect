import { useState, useEffect } from "react";
import axios from "axios";

import {BiRefresh} from 'react-icons/bi'

const PetById = () => {
  const [pet, setPet] = useState(null);
  const [location, setLocation] = useState('');
  const time = new Date().toString();

  const path = window.location.pathname.split("/");

  const id = path[path.length - 1];

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  const updateTime = () => {
    axios
      .patch(`${import.meta.env.VITE_BASE_URL}/api/pets/updateLocation`, {
        id: id,
        lastSeen: time,
        lastLocation: location,
      })
      .then((res) => {
        setPet((prev) => ({
          ...prev,
          lastSeen: res.data.lastSeen,
          lastLocation: res.data.lastLocation,
      }));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    updateTime();
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/pets/${id}`)
      .then((res) => {
        setPet(res.data.pet);
      })
      .catch((err) => console.log(err));
  }, [location]);

  if(!pet) return (
    <div className="flex items-center justify-center w-full h-screen">
      <h1 className="text-3xl font-bold">Loading...</h1>
    </div>
  )

  return (
    <div className="flex items-start justify-start w-screen min-h-[80vh] sm:px-12 px-4 py-5 md:flex-row flex-col">
      <div className="flex items-center justify-center border-[1px] rounded-xl flex-1 p-1">
        <img className="rounded-lg w-full" src={pet?.image} alt={pet?.name} />
      </div>
      <div className="flex-1 w-full sm:p-10 p-0 flex flex-col items-center justify-start">
        <h1 className="text-4xl">{pet?.name}</h1>
        <p>{pet?.owner?.name}</p>
        <div className="flex items-center justify-start sm:mt-0 mt-2">
          <p className="text-xs">Last seen: {formatTime(pet?.lastSeen)}</p>
          <button onClick={updateTime} className="text-white bg-transparent border-none rounded-lg px-2 py-1 group outline-none focus:outline-none">
            <BiRefresh className="m-1 group-hover:rotate-180 transition ease-in-out border-none focus:border-none" />
          </button>
        </div>
        <h2 className="mt-4 self-start text-xl">Contact Owner</h2>
        <div className="flex sm:items-center items-start justify-between w-full sm:flex-row flex-col">
        <p>Email: {pet?.owner?.email}</p>
        <p>Contact: {pet?.owner?.contact}</p>
        </div>
        <button className="p-2 bg-teal-600 hover:bg-teal-700 text-white mt-4 self-end border-none outline-none focus:outline-none" onClick={getLocation} >Update Location</button>
      </div>
    </div>
  );
};

export default PetById;
