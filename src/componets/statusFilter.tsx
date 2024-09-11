import { OrderStatus } from "../types/types";

type FilterProps = {
    onSelectItem: Function;
    selectedItem: any[];
};

const StatusFilter = ({ onSelectItem, selectedItem }: FilterProps) => {
    const items = Object.entries(OrderStatus);
    const getClassForActiveItem = (item: any[]) => {
        return selectedItem[1] === item[1] ? " active" : "";
    };

    return (
        <div className="dropdown ">
            <button
                className="btn btn-outline-primary dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {selectedItem.length!==0 ? selectedItem[0] : "Фильтр"}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                {items.map((item, index) => (
                    <li key={index}>
                        <button
                            className={
                                "dropdown-item" + getClassForActiveItem(item)
                            }
                            type="button"
                            onClick={() => onSelectItem(item)}
                        >
                            {item[0]}
                        </button>
                    </li>
                ))}
                <li>
                    <hr className="dropdown-divider"></hr>
                </li>
                <li>
                    <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => onSelectItem([])}
                    >
                        Сброс
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default StatusFilter;
