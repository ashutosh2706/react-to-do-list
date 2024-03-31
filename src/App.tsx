import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Home from "./pages/Home";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/list" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
