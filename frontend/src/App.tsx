import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@components/Layout";
import LandingPage from "@pages/LandingPage";
import Sobre from "@pages/Sobre";
import Suporte from "@pages/Suporte";
import ComparePage from "@pages/ComparePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/suporte" element={<Suporte />} />
          <Route path="/comparar" element={<ComparePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
