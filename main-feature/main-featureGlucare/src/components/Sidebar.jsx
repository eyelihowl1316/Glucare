import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { FaHome, FaList, FaCalendar, FaRobot, FaCog, FaBars, FaSignOutAlt, FaChartPie} from "react-icons/fa";

function Sidebar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);

    const menu = [
    { name: "Beranda", icon: <FaHome />, path: "/" },
    { name: "Analisis", icon: <FaChartPie />, path: "/analisis" },
    { name: "Rekomendasi", icon: <FaList />, path: "/rekomendasi" },
    { name: "Rencana 90 Hari", icon: <FaCalendar />, path: "/rencana" },
    { name: "Glubot", icon: <FaRobot />, path: "/glubot" },
    { name: "Pengaturan", icon: <FaCog />, path: "/pengaturan" },
    ];

    return (
    <div
        className={`h-screen flex flex-col text-white px-4 bg-gradient-to-b from-[#003a68] to-[#0072CE] transition-all duration-300 
            ${isOpen ? "w-60" : "w-24"}`}
    >
        <div className="flex items-center justify-between mb-4 h-14 -mx-4 px-2">
            <div className="flex items-center gap-3 min-w-0">
            <img src="/logo_glucare.png" className="w-12 h-12 min-w-[48px] object-contain flex-shrink-0"
            />
            
            <span className={`text-base font-black tracking-wide whitespace-nowrap transition-all duration-200
                ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}
            `}
            >
                GLUCARE
            </span>
        </div>

        <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex items-center justify-center text-xl flex-shrink-0"
        >
            <FaBars />
        </button>
        </div>

        <ul className="flex-1">
        {menu.map((item) => (
            <Link
            key={item.name}
            to={item.path}
            className="no-underline text-white"
            >
            <li
                className={`
                relative flex items-center h-12 rounded-lg cursor-pointer mb-2 font-bold text-sm px-3
                ${
                    location.pathname === item.path
                    ? "bg-blue-500"
                    : "hover:bg-white/20"
                }
                `}
            >
                <span className="w-6 flex justify-center text-lg flex-shrink-0">
                    {item.icon}
                </span>
                
                <span className={`absolute left-12 whitespace-nowrap transition-all duration-200
                ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}
                `}
                >
                    {item.name}
                </span>
            </li>
            </Link>
        ))}
        </ul>

        <div className="mt-auto mb-4">
        <Link
            to="/login"
            className="relative flex items-center h-12 px-3 rounded-lg font-bold hover:bg-white/20 text-sm text-white no-underline"
        >
            <span className="w-6 flex justify-center text-lg flex-shrink-0">
            <FaSignOutAlt />
            </span>

            <span
            className={`
                absolute left-12 whitespace-nowrap transition-all duration-200
                ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
            >
            Keluar
            </span>
        </Link>

        <div className="h-px bg-white/40 my-3"></div>

        <Link
            to="/profile"
            className="relative flex items-center h-12 px-3 text-white no-underline"
        >
            <img
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            src=""
            />

            <span
            className={`
                absolute left-14 font-bold text-sm whitespace-nowrap transition-all duration-200
                ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
            >
            Username
            </span>
        </Link>
        </div>
    </div>
    );
}

export default Sidebar;