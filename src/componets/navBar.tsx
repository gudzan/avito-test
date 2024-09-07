import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <>
            <div className="container">
                <h1 className="mb-3">Личный кабинет</h1>
                <ul className="nav nav-tabs">
                    <NavLink
                        to="/advertisements"
                        className={({ isActive }) =>
                            "nav-link" + (isActive ? " active" : "")
                        }
                        aria-current="page"
                    >
                        Мои объявления
                    </NavLink>
                    <NavLink
                        to="/orders"
                        className={({ isActive }) =>
                            "nav-link" + (isActive ? " active" : "")
                        }
                        aria-current="page"
                    >
                        Мои заказы
                    </NavLink>
                </ul>
            </div>
        </>
    );
}
