import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Advertisment } from "../../types/types";
import Spinner from "../../componets/spinner";
import ModalAdvertisementEdit from "../../componets/AdvertisementModal/modalAdvertisementEdit";
import defaultImage from "../../assets/images/default-image.jpg";
import "./advertisments.css";

export default function AdvertisementPage() {
    const advertisementId = useParams().id;
    const [advertisment, setAdvertisment] = useState<Advertisment>();
    const [isLoading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();

    async function getData() {
        const url = `http://localhost:3000/advertisements/${advertisementId}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setAdvertisment(json);
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);

    function onClose(newAdvertisment?: Advertisment) {
        if (newAdvertisment !== null && newAdvertisment !== undefined) {
            setAdvertisment(newAdvertisment);
        }
        setModalIsOpen(false);
    }

    function onOpen() {
        setModalIsOpen(true);
    }

    if (isLoading) {
        return (
            <div className="container mt-3 mb-5">
                <Spinner />
            </div>
        );
    } else if (advertisment !== undefined) {
        return (
            <div className="container p-4 mb-5 box-shadow rounded-top rounded-3">
                <div className="d-flex justify-content-start gap-10 mb-3">
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => navigate(-1)}
                    >
                        <i className="bi bi-arrow-left"></i> Назад
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        onClick={onOpen}
                    >
                        <i className="bi bi-pencil pe-1"></i> Изменить
                    </button>
                </div>
                <div className="card p-3 advertismentPage-card">
                    <div className="row">
                        <div className="col-md-3">
                            <img
                                src={
                                    advertisment.imageUrl
                                        ? advertisment.imageUrl
                                        : defaultImage
                                }
                                className="img-card"
                            />
                        </div>
                        <div className="col-md-9 ">
                            <div className="card-body d-flex flex-column gap-10">
                                <h5 className="card-title">
                                    {advertisment.name}
                                </h5>
                                <div className="card-text">
                                    <b>Описание товара: </b>
                                    <p
                                        className={`card-text ${
                                            advertisment.description
                                                ? ""
                                                : "text-secondary"
                                        }`}
                                    >
                                        {advertisment.description
                                            ? advertisment.description
                                            : "(нет описания)"}
                                    </p>
                                </div>
                                <div className="card-text">
                                    <b>Цена: </b>
                                    {advertisment.price.toLocaleString(
                                        "ru"
                                    )}{" "}
                                    руб.
                                </div>
                                <div className="card-text">
                                    <b>Просмотры: </b>
                                    {advertisment.views.toLocaleString("ru")}
                                </div>
                                <div className="card-text">
                                    <b>Лайки: </b>
                                    {advertisment.likes.toLocaleString("ru")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {modalIsOpen && (
                    <ModalAdvertisementEdit
                        advertisment={advertisment}
                        isOpen={modalIsOpen}
                        onClose={onClose}
                    />
                )}
            </div>
        );
    }
}
