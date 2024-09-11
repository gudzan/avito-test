import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="container mt-4 nav-bar">
            <ul className="nav nav-tabs nav-fill">
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
    );
}
