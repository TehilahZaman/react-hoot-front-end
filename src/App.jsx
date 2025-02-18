import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";

import * as hootService from "./services/hootService";
import HootList from "./components/HootList/HootList.jsx";
import HootDetails from "./components/HootDetails/HootDetails.jsx";

import { UserContext } from "./contexts/UserContext";

const App = () => {
  const { user } = useContext(UserContext);

  const [hoots, setHoots] = useState([]);

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
      // console.log("hoots data", hootsData); - to test
      setHoots(hootsData);
    };
    if (user) fetchAllHoots();
    // this is a function- and has to be called: ()
  }, [user]);
  // get all the hoots thorugh hootService index, if the user is logged in, upon change of the user state or page loads

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {/* certain routes are protect and only available to signed in users  */}
        {user ? (
          <>
            <Route path="/hoots" element={<HootList hoots={hoots} />} />
            <Route path="hoots/:hootId" element={<HootDetails />} />
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
