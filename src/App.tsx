import { Routes, Route } from "react-router-dom";
import Advertisements from "./pages/advertisements";
import Orders from "./pages/orders";
import "./App.css";
import NavBar from "./componets/navBar";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Advertisements />} />
                <Route path="/advertisements" element={<Advertisements />} />
                <Route path="/orders" element={<Orders />} />
            </Routes>
        </>
    );
}

export default App;
