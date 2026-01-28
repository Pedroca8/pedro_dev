import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home }  from "./pages/Home";
import { Sobre } from "./pages/Sobre";
import { NotFound } from "./pages/NotFound";

function App() {
  return(
    <BrowserRouter>
    <Routes>
       <Route path="*" element={<NotFound/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/Sobre" element={<Sobre/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
