import { useEffect, useState } from "react";
import { Order, OrderStatus } from "../../types/types";
import OrderModal from "../../componets/OrdersModal/orderModal";
import moment from "moment";
import StatusFilter from "../../componets/statusFilter";
import Spinner from "../../componets/spinner";

export default function Orders() {
    const columns = [
        "Номер заказа",
        "Статус",
        "Дата создания",
        "Способ доставки",
        "Общая стоимость",
        "Кол-во товаров",
        "Товары",
    ];

    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectOrder, setSelectOrder] = useState<Order>();
    const [selectStatus, setSelectStatus] = useState<any[]>([]);
    const [sortTotalOrder, setSortTotalOrder] = useState("desc");
    const baseUrl = "http://localhost:3000/orders/";

    async function getOrdersWithSort() {
        const url = baseUrl;
        setLoading(true);
        const response = await fetch(
            url + `?_sort=total&_order=${sortTotalOrder}`
        );
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setOrders(json);
        setLoading(false);
        return json;
    }

    async function getOrdersWithSortAndFilter() {
        const url = baseUrl;
        const response = await fetch(
            url +
                `?_sort=total&_order=${sortTotalOrder}&status=${selectStatus[1]}`
        );
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setOrders(json);
        return json;
    }

    useEffect(() => {
        if (selectStatus.length !== 0) {
            getOrdersWithSortAndFilter();
        } else {
            getOrdersWithSort();
        }
    }, [sortTotalOrder, selectStatus]);

    function onClose() {
        setModalIsOpen(false);
    }

    function onOpen(order: Order) {
        setSelectOrder(order);
        setModalIsOpen(true);
    }

    function handleSelectStatus(status: any[]) {
        setSelectStatus(status);
    }

    function handleSort() {
        setSortTotalOrder(sortTotalOrder === "asc" ? "desc" : "asc");
    }

    const typeOfArrow =
        sortTotalOrder === "asc" ? (
            <i className="bi bi-caret-down-fill"></i>
        ) : (
            <i className="bi bi-caret-up-fill"></i>
        );

    if (isLoading) {
        return (
            <div className="container mt-3 mb-5">
                <Spinner />
            </div>
        );
    } else {
        return (
            <div className="container p-4 mb-5 box-shadow rounded-top rounded-3">
                <div className="d-flex gap-10 mb-3">
                    <StatusFilter
                        onSelectItem={handleSelectStatus}
                        selectedItem={selectStatus}
                    />
                    {orders.length === 0 && (
                        <div className="text-black-50 p-2">
                            Заказов со статусом {selectStatus[0]} не найдено
                        </div>
                    )}
                </div>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            {columns.map((element, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    onClick={
                                        index === 4
                                            ? () => handleSort()
                                            : undefined
                                    }
                                >
                                    {element}
                                    {index === 4 && typeOfArrow}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((element) => (
                            <tr key={element.id}>
                                <td>{element.id}</td>
                                <td>
                                    {Object.keys(OrderStatus)[element.status]}
                                </td>
                                <td>
                                    {moment(element.createdAt)
                                        .utc()
                                        .format("DD.MM.YYYY HH:mm")}
                                </td>
                                <td>{element.deliveryWay}</td>
                                <td>
                                    {element.total.toLocaleString("ru")} руб.
                                </td>
                                <td>
                                    {element.items.length.toLocaleString("ru")}
                                </td>
                                <td>
                                    <button
                                        className="w-100 btn btn-primary"
                                        onClick={() => onOpen(element)}
                                    >
                                        Показать все товары
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {modalIsOpen && selectOrder !== undefined && (
                    <OrderModal
                        isOpen={modalIsOpen}
                        onClose={onClose}
                        order={selectOrder}
                    />
                )}
            </div>
        );
    }
}
