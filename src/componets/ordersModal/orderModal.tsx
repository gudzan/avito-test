import { useNavigate } from "react-router-dom";
import { Order } from "../../types/types";
import { CustomModal } from "../CustomModal/customModal";
import "./orderModal.css";

type ModalProps = {
    order: Order;
    isOpen: boolean;
    onClose: Function;
};

export default function OrderModal({ order, isOpen, onClose }: ModalProps) {
    const navigate = useNavigate();

    function handleClick(id: string) {
        navigate(`/advertisements/${id}`);
    }

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <>
                <h3 className="mb-3">Информация о товарах</h3>
                {order.items.length !== 0 ? (
                    <>
                        <div className="card order-card mb-3">
                            <ul className="list-group list-group-flush">
                                {order.items.map((item) => (
                                    <>
                                        <li key={item.id} className="list-group-item" onClick={()=>handleClick(item.id)}>
                                            <div><b>{item.name}</b></div>
                                            <div>
                                                <b>Цена за один товар: </b>
                                                {item.price.toLocaleString(
                                                    "ru"
                                                )}{" "}
                                                руб.
                                            </div>
                                            <div>
                                                <b>Кол-во товара: </b>
                                                {item.count.toLocaleString(
                                                    "ru"
                                                )}{" "}
                                                шт.
                                            </div>
                                            <div>
                                                <b>Стоимость: </b>
                                                {item.price.toLocaleString(
                                                    "ru"
                                                )}{" "}
                                                x{" "}
                                                {item.count.toLocaleString(
                                                    "ru"
                                                )}{" "}
                                                ={" "}
                                                {(
                                                    item.price * item.count
                                                ).toLocaleString("ru")} 
                                                руб.
                                            </div>
                                        </li>
                                    </>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <b>Общая стоимость заказа: </b>
                            {order.total.toLocaleString("ru")} руб.
                        </div>
                    </>
                ) : (
                    <p>Товаров в заказе нет!</p>
                )}
            </>
        </CustomModal>
    );
}
