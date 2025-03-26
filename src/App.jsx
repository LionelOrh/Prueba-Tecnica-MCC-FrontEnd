import ClientesList from "./pages/ClientesList";
import RegistrarCliente from "./pages/RegistrarCliente";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientesList/>} />
        <Route path="/registrar" element={<RegistrarCliente/>} />
        <Route path="/actualizar/:id" element={<RegistrarCliente />} />
      </Routes>
    </Router>
  )
}

export default App
