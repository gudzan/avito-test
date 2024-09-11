import { Routes, Route } from "react-router-dom";
import AdvertisementsList from "./pages/advertisments/advertisementsList";
import AdvertisementPage from "./pages/advertisments/advertisementPage";
import Orders from "./pages/orders/ordersList";
import NavBar from "./componets/navBar/navBar";
import "./App.css";
import Header from "./componets/header/header";

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
