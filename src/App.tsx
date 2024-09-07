import { Routes, Route } from "react-router-dom";
import AdvertisementsList from "./pages/advertisementsList";
import AdvertisementPage from "./pages/advertisementPage";
import Orders from "./pages/orders";
import NavBar from "./componets/navBar";
import "./App.css";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<AdvertisementsList />} />
                <Route path="/advertisements/:id" element={<AdvertisementPage />} />
                <Route path="/advertisements" element={<AdvertisementsList />} />
                <Route path="/orders" element={<Orders />} />
            </Routes>
        </>
    );
}

export default App;
