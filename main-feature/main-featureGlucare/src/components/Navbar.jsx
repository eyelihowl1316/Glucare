import { Link, NavLink } from "react-router-dom";
import logo_login from "../assets/logo_login.png";

export default function Navbar() {
    return (
        <header className="w-full bg-white rounded-b-[20px] shadow-md fixed top-0 left-0 z-50 font-[Poppins]">
            <nav className="flex items-center justify-between max-w-6xl mx-auto px-5 py-4">
        
                <Link to="/" className="flex items-center">
                    <img src="/logo_glucare.png" alt="Logo" className="w-10" />
                        <h2 className="text-[21px] font-bold text-[#0072CE]">Glucare</h2>
                </Link>

                <ul className="flex gap-5 list-none overflow-x-auto">
                    <li>
                        <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-[15px] font-bold ${
                            isActive ? "text-[#0072CE]" : "text-black hover:text-[#0072CE]"}`}>Beranda
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/tentang"
                            className={({ isActive }) =>
                                `text-[15px] font-bold ${
                                isActive ? "text-[#0072CE]" : "text-black hover:text-[#0072CE]"}`}>Tentang Kami
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/fitur"
                            className={({ isActive }) =>
                                `text-[15px] font-bold ${
                                isActive ? "text-[#0072CE]" : "text-black hover:text-[#0072CE]"}`}>Fitur Utama
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/cara-kerja"
                            className={({ isActive }) =>
                                `text-[15px] font-bold ${
                                isActive ? "text-[#0072CE]" : "text-black hover:text-[#0072CE]"}`}> Cara Kerja
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/hubungi"
                            className={({ isActive }) =>
                                `text-[15px] font-bold ${
                                isActive ? "text-[#0072CE]" : "text-black hover:text-[#0072CE]"}`}>Hubungi Kami
                        </NavLink>
                    </li>
                </ul>

                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        `flex items-center gap-2 font-semibold transition ${
                        isActive
                            ? "text-[#0072CE]"
                            : "text-black hover:text-[#0072CE]"
                        }`
                    }
                    >
                    <img src={logo_login} alt="login" className="w-[14px]" />
                    <span>Masuk</span>
                    </NavLink>
            </nav>
        </header>
    );
}