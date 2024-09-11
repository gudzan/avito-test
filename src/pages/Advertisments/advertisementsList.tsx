import { ChangeEvent, useEffect, useState } from "react";
import type { Advertisment } from "../../types/types.ts";
import Spinner from "../../componets/spinner.tsx";
import { useNavigate } from "react-router-dom";
import Pagination from "../../componets/pagination.tsx";
import {
    PaginationStore,
    setCount,
    setCurrentPage,
    setPageSize,
} from "../../redux/paginationSlice.ts";
import { useAppDispath, useAppSelector } from "../../redux/store.ts";
import ModalAdvertisementNew from "../../componets/AdvertisementModal/modalAdvertisementNew.tsx";
import defaultImage from "../../assets/images/default-image.jpg";
import _ from "lodash";
import "./advertisments.css";

export default function AdvertisementsList() {
    const dispatch = useAppDispath();
    const [advertisments, setAdvertisments] = useState<Advertisment[]>([]);
    const [isLoading, setLoading] = useState(true);
    const { pageSize, currentPage, count }: PaginationStore = useAppSelector(
        (state) => state.paginationAdvertisements
    );
    const [searchData, setSearchData] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    let navigate = useNavigate();
    let debounced = _.debounce(getData);

    async function getData(str: string) {
        const url = `http://localhost:3000/advertisements/?_start=${
            (currentPage - 1) * pageSize
        }&_limit=${pageSize}&name_like=${str}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        const newCount = Number(response.headers.get("X-Total-Count"));
        setAdvertisments(json);
        setLoading(false);
        dispatch(setCount({ count: newCount }));
    }

    useEffect(() => {
        let timeoutId = setTimeout(() => debounced(searchData), 250);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchData]);

    useEffect(() => {
        getData(searchData);
    }, [pageSize, currentPage, modalIsOpen]);

    const columns = [
        "Фотография",
        "Название",
        "Стоимость",
        "Просмотры",
        "Лайки",
    ];

    function handleClick(id: string) {
        navigate(`/advertisements/${id}`);
    }

    function handleChangeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        const dataChange = event.target;
        const newPageSize = +dataChange.value;
        dispatch(setCurrentPage({ currentPage: 1 }));
        dispatch(setPageSize({ pageSize: newPageSize }));
    }

    const handleCurrentPage = (pageNumber: number) => {
        dispatch(setCurrentPage({ currentPage: pageNumber }));
    };

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        dispatch(setCurrentPage({ currentPage: nextPage }));
    };

    const handlePreviousPage = () => {
        const previousPage = currentPage - 1;
        dispatch(setCurrentPage({ currentPage: previousPage }));
    };

    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        setSearchData(event.target.value);
        dispatch(setCurrentPage({ currentPage: 1 }));
    }

    function onClose() {
        setModalIsOpen(false);
    }

    function onSubmit() {
        setModalIsOpen(false);
        dispatch(setCurrentPage({ currentPage: 1 }));
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
    } else {
        return (
            <div className="container p-4 mb-5 box-shadow rounded-top rounded-3">
                <div className="d-flex justify-content-between gap-10 mb-3">
                    <input
                        className="form-control"
                        placeholder="Поиск по названию..."
                        type="text"
                        value={searchData}
                        onChange={handleSearch}
                    />
                    <button
                        type="button"
                        className="btn btn-primary d-flex justify-content-between"
                        data-toggle="modal"
                        onClick={onOpen}
                    >
                        <i className="bi bi-plus-lg pe-1"></i>
                        Добавить
                    </button>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            {columns.map((element, index) => (
                                <th key={index} scope="col">
                                    {element}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {advertisments.map((element) => (
                            <tr
                                className="tr-hover"
                                key={element.id}
                                onClick={() => handleClick(element.id)}
                            >
                                <td>
                                    <img
                                        src={
                                            element.imageUrl
                                                ? element.imageUrl
                                                : defaultImage
                                        }
                                        className="img-fluid"
                                    />
                                </td>
                                <td>{element.name}</td>
                                <td>{element.price.toLocaleString("ru")}</td>
                                <td>{element.views.toLocaleString("ru")}</td>
                                <td>{element.likes.toLocaleString("ru")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="d-flex gap-25 align-items-center pagination-box">
                    {pageSize < count && (
                        <Pagination
                            onSelectPage={handleCurrentPage}
                            onNextPage={handleNextPage}
                            onPreviousPage={handlePreviousPage}
                            currentPage={currentPage}
                            itemsCount={count}
                            pageSize={pageSize}
                        />
                    )}
                    <div>Элементов на странице</div>
                    <select
                        className="form-select"
                        onChange={handleChangeSelect}
                    >
                        <option selected={pageSize === 3} value="3">
                            3
                        </option>
                        <option selected={pageSize === 5} value="5">
                            5
                        </option>
                        <option selected={pageSize === 10} value="10">
                            10
                        </option>
                        <option selected={pageSize === 20} value="20">
                            20
                        </option>
                    </select>
                </div>

                {modalIsOpen && (
                    <ModalAdvertisementNew
                        isOpen={modalIsOpen}
                        onClose={onClose}
                        onSubmit={onSubmit}
                    />
                )}
            </div>
        );
    }
}
