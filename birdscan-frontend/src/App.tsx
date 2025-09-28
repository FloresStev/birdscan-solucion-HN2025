import "./App.css";
import Navbar from "./components/Main/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Explorer from "./pages/Explorer.tsx";
import Tours from "./pages/Tours.tsx";
import Events from "./pages/Events.tsx";
import Learn from "./pages/Educational.tsx";
import LogIn from "./pages/LogIn.tsx";
import SignIn from "./pages/SignUp.tsx";
import Birds from "./pages/Birds.tsx";

import { Routes, Route } from "react-router";
import ProtectedRoute from "./components/Main/ProtectedRoute.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import OAuthSuccess from "./components/User/OAuthSucces.tsx";

import NaturalReserves from "./pages/NaturalReserves.tsx";
import EditProfile from "./pages/EditProfile.tsx";
import BirdsDetails from "./components/Explore/BirdsDetails.tsx";


function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explorer />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/events" element={<Events />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/birds" element={<Birds />} />
          <Route path="/birds/:id" element={<BirdsDetails />} />
          <Route path="/naturalreserves" element={<NaturalReserves />} />
          <Route path="/editprofile" element={<EditProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
