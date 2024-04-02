import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import Check from "./pages/Check";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Check />}/>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
