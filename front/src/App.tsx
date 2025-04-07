import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home/Home";
import ListsAppartement from "./pages/ListsAppartement/ListsAppartement";
import AjoutAppartement from "./pages/AjoutAppartement/AjoutAppartement";
import AjoutAppartementSurSudBar from "./pages/AjoutAppartementSurSudBar/AjoutAppartementSurSudBar";
import AjoutAppartementSurTBL from "./pages/AjoutAppartementSurTBL/AjoutAppartementSurTBL";
import ModifAppartement from "./pages/ModifAppartement/ModifAppartement";
import Histogramme from "./pages/Histogramme/Histogramme";
import Messages from "./pages/Messages/Messages";
import Parametres from "./pages/Parametres/Parametres";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listsAppartement" element={<ListsAppartement />} />
        <Route path="/ajoutAppartement" element={<AjoutAppartement />} />
        <Route path="/ajoutAppartementSurSudBar" element={<AjoutAppartementSurSudBar />} />
        <Route path="/ajoutAppartementSurTBL" element={<AjoutAppartementSurTBL />} />
        <Route path="/modifAppartement/:numApp" element={<ModifAppartement />} />
        <Route path="/histogramme" element={<Histogramme />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/parametres" element={<Parametres />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;