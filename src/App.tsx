import { Routes, Route, Navigate } from "react-router-dom";
import AdvertisementsList from "./pages/advertisment/advertisementsList";
import AdvertisementPage from "./pages/advertisment/advertisementPage";
import Orders from "./pages/order/ordersList";
import NavBar from "./componets/navBar";
import Header from "./componets/header";

function App() {
    return (
        <>
        <Header/>
            <NavBar />
            <Routes>
                <Route path="/" element={<Navigate to="/advertisements" replace />}/>
                <Route path="/advertisements/:id" element={<AdvertisementPage />} />
                <Route path="/advertisements" element={<AdvertisementsList />} />
                <Route path="/orders" element={<Orders />} />   
            </Routes>
        </>
    );
}

export default App;
