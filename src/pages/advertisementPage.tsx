import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Advertisment } from "../types/types";
import Spinner from "../componets/spinner";

export default function AdvertisementPage() {
    const advertisementId = useParams().id;
    const [advertisment, setAdvertisment] = useState<Advertisment>();
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    async function getData() {
        const url = `http://localhost:3000/advertisements/${advertisementId}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            setAdvertisment(json);
            setLoading(false);
        } catch (error) {
            if (error instanceof Error) console.error(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if (isLoading) {
        return <Spinner />;
    } else {
        return (
            <div className="container mt-3">
                <div className="d-flex justify-content-start">
                    <button
                        className="btn btn-outline-secondary mb-3"
                        onClick={() => navigate(-1)}
                    >
                        <i className="bi bi-arrow-left"></i> Назад
                    </button>
                </div>
                <div className="card p-3 advertismentPage-card">
                    <div className="row ">
                        <div className="col-md-3">
                            <img
                                src={advertisment?.imageUrl}
                                className="img-card"
                            />
                        </div>
                        <div className="col-md-9">
                            <div className="card-body d-flex flex-column gap-10">
                                <h5 className="card-title">
                                    {advertisment?.name}
                                </h5>
                                <div className="card-text">
                                    <b>Описание товара: </b>
                                    {advertisment?.description}
                                </div>
                                <div className="card-text">
                                    <b>Цена: </b>
                                    {advertisment?.price.toLocaleString("ru")}{" "}
                                    руб.
                                </div>
                                <div className="card-text">
                                    <b>Просмотры: </b>{" "}
                                    {advertisment?.views.toLocaleString("ru")}
                                </div>
                                <div className="card-text">
                                    <b>Лайки: </b>{" "}
                                    {advertisment?.likes.toLocaleString("ru")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
