import _ from "lodash";

type PaginationProps = {
    itemsCount: number;
    pageSize: number;
    currentPage: number;
    onSelectPage: Function;
    onPreviousPage: Function;
    onNextPage: Function;
};

export default function Pagination({
    itemsCount,
    pageSize,
    currentPage,
    onSelectPage,
    onPreviousPage,
    onNextPage,
}: PaginationProps) {
    const pagesCount = Math.ceil(itemsCount / pageSize);
    const pages: number[] = _.range(1, pagesCount + 1);

    const getClassForActiveItem = (page: number) => {
        return currentPage === page ? " active" : "";
    };

    return (
        <nav>
            <ul className="pagination justify-content-start">
                <li
                    className={
                        "page-item" + (currentPage === 1 ? " disabled" : "")
                    }
                >
                    <button
                        className="page-link"
                        onClick={() => onPreviousPage()}
                    >
                        Назад
                    </button>
                </li>
                {pages.map((page) => (
                    <li
                        className={`page-item` + getClassForActiveItem(page)}
                        key={`page: ${page}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onSelectPage(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                <li
                    className={
                        "page-item" +
                        (currentPage === pages[pages.length - 1]
                            ? " disabled"
                            : "")
                    }
                >
                    <button className="page-link" onClick={() => onNextPage()}>
                        Вперед
                    </button>
                </li>
            </ul>
        </nav>
    );
}
