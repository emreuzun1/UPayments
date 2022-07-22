import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Detail from "./pages/Detail";
import Create from "./pages/Create";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Detail />} />
      <Route path="create" element={<Create />} />
    </Routes>
  );
};

export default App;
