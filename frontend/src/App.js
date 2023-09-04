import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from './context/UserContext'

import Home from './pages/Home'
import Login from './pages/Users/Login'
import Perfil from './pages/Users/Perfil'
import Register from './pages/Users/Register'
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Container from "./components/Container";
import Agendamento from "./pages/Users/Agendamento";


function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <NavBar />
          <Container>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/perfil" element={<Perfil />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/Agendamento" element={<Agendamento />} />
            </Routes>
          </Container>
          <Footer />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
