import { Routes, Route } from "react-router-dom";
import Public from "./components/Public";
import Layout from "./components/Layout";
import SignUp from "./features/auth/SignUp";
import SignIn from "./features/auth/SignIn";
import DashLayout from "./components/dashboard/DashLayout";
import DashWelcome from "./components/dashboard/DashWelcome";
import CreatePet from "./components/petsCRUD/CreatePet";
import PetById from "./components/PetById";
import EditPet from "./features/edit/EditPet";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="api/auth/signup" element={<SignUp />} />
        <Route path="api/auth/signin" element={<SignIn />} />
        <Route path="api/pets/:id" element={<PetById />} />
      </Route>

      <Route path="/" element={<DashLayout />}>
        <Route path="dashboard" index element={<DashWelcome />} />
        <Route path="api/pets/edit/:id" element={<EditPet />} />
      </Route>
    </Routes>
  );
}

export default App;
