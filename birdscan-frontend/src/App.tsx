import './App.css';
import Navbar from './components/Main/Navbar.tsx';
import Home from './pages/Home.tsx';
import Explorer from './pages/Explorer.tsx';
import Tours from './pages/Tours.tsx';
import Events from './pages/Events.tsx';
import Learn from './pages/Educational.tsx';
import LogIn from './pages/LogIn.tsx';
import SignIn from './pages/SignIn.tsx';


import {Routes, Route} from 'react-router';

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/explore" element = {<Explorer />} />
        <Route path = "/tours" element = {<Tours />} />
        <Route path = "/events" element = {<Events />} />
        <Route path = "/learn" element = {<Learn />} />
        <Route path = "/login" element = {<LogIn />} />
        <Route path = "/signin" element = {<SignIn />} />

      </Routes>
    </>
  )
}

export default App
