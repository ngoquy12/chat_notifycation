import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home_Chat from "./components/Home_Chat";
import List_Request from "./components/List_Request";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRouter from "./routers/PrivateRouter";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRouter />}>
          <Route path="/chat" element={<Home_Chat />} />
          <Route path="/list-request" element={<List_Request />} />
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
