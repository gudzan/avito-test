import { useEffect, useState } from "react";
import type { Advertisment } from "../types/types.ts";
import Spinner from "../componets/spinner.tsx";
import { useNavigate } from "react-router-dom";
import Pagination from "../componets/pagination.tsx";
import {
    PaginationStore,
    setCount,
    setCurrentPage,
    setPageSize,
} from "../redux/paginationSlice.ts";
import { useAppDispath, useAppSelector } from "../redux/store.ts";

export default function AdvertisementsList() {
    const dispatch = useAppDispath();
    const [advertisments, setAdvertisments] = useState<Advertisment[]>([]);
    const [isLoading, setLoading] = useState(true);
    const { pageSize, currentPage, count }: PaginationStore = useAppSelector((state) => state.paginationAdvertisements);
    let navigate = useNavigate();

    async function getData() {
        const url = `http://localhost:3000/advertisements/?_page=${currentPage}&_per_page=${pageSize}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            setAdvertisments(json.data);
            setLoading(false);
            dispatch(setCount({ count: json.items }));
        } catch (error) {
            if (error instanceof Error) console.error(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, [pageSize, currentPage]);

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
        dispatch(setPageSize({ pageSize: newPageSize }));
        dispatch(setCurrentPage({ currentPage: 1 }));
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

    if (isLoading) {
        return <Spinner />;
    } else {
        return (
            <div className="container mt-3 mb-5">
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
                                key={element.id}
                                onClick={() => handleClick(element.id)}
                            >
                                <td>
                                    <img
                                        src={element.imageUrl}
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
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option selected value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>
        );
    }
}
