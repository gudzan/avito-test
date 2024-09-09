import { Routes, Route } from "react-router-dom";
import AdvertisementsList from "./pages/Advertisments/advertisementsList";
import AdvertisementPage from "./pages/Advertisments/advertisementPage";
import Orders from "./pages/Orders/ordersList";
import NavBar from "./componets/NavBar/navBar";
import "./App.css";
import Header from "./componets/Header/header";

function App() {
    return (
        <>
        <Header/>
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
