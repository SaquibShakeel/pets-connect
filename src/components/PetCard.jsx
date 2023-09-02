import profile from "../assets/profile.jpeg"

const PetCard = ({ pet, onClick }) => {
    return (
      <div
        className="flex flex-col justify-center items-center p-5 sm:m-5 m-1 w-[250px] h-[250px] rounded-lg bg-tertiary shadow-lg"
        onClick={onClick}
      >
        <img
          className="h-40 w-40 rounded-full bg-center bg-auto"
          src={pet.image || profile}
          alt="image"
        />
        <h2 className="mt-1 text-xl">{`${pet.name}`}</h2>
      </div>
    );
}

export default PetCard