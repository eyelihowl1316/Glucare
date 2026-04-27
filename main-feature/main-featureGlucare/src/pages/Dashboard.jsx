import { useEffect, useState} from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Profile from "../assets/Profile.jpg"
import { useSidebar } from "../hooks/useSidebar";

function Dashboard(){
    const navigate = useNavigate();
    const { isOpen } = useSidebar();

    const riskData = null;

    const [streak, setStreak] = useState(0);
    const [day, setDay] = useState(1);
    
    const hour = new Date().getHours();
    let greeting ="Good Morning";
    if (hour >=12 && hour < 18) greeting = "Good Afternoon";
    if (hour >=18) greeting ="Good Evening";

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userProgress"));

        if(!data) return;

        const today = new Date();
        const start = new Date(data.startDate);

        const diffTime = today - start;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        setDay(diffDays);

        const checkedDays = data.checkedDays || [];
        setStreak(checkedDays.length);
    }, []);

    return(
        <div className={`flex-1 transition-all duration-300 ${isOpen ? 'lg:ml-60' : 'lg:ml-24'}`}>
            <Sidebar />

            <div className="flex-1 p-4 sm:p-6 lg:ml-8 lg:p-6">
                <div className="max-w-5xl mx-auto w-full">
                    
                    
                    <div className="flex items-center gap-3 mb-6 lg:mb-8">
                        <img src={Profile} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0"/>
                        <div className="min-w-0">
                            <p className="text-sm text-gray-500 hidden sm:block">
                                {greeting}
                            </p>

                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 truncate">
                                Halo, Nana 👋
                            </h2>
                        </div>
                    </div>

                    
                    <div className="mt-6 sm:mt-10 max-w-5xl w-full bg-gradient-to-r from-[#0072CE] to-[#3E97FF] text-white p-4 sm:p-6 rounded-2xl shadow-md">
                        <p className="text-xs sm:text-sm opacity-90">Status Risiko</p>

                        <h3 className="text-lg sm:text-xl font-bold mt-1">
                            {riskData ? riskData.status : "Belum ada data"}
                        </h3>

                        <p className="text-xs sm:text-sm mt-2 opacity-90 leading-relaxed">
                            Yuk mulai penilaian untuk melihat kondisi kesehatan Anda saat ini.
                        </p>

                        <button 
                            onClick={() => navigate("/analisis")}
                            className="mt-4 w-full bg-white text-[#0072CE] font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-xl hover:bg-gray-100 transition-all duration-200"
                        >
                            {riskData ? "Cek Kembali Risiko Anda":"Cek Risiko Anda Sekarang"}
                        </button>
                    </div>

                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8 max-w-5xl w-full">
                        <div className="bg-white rounded-2xl shadow-sm sm:shadow-md p-4 sm:p-5 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                <span className="text-xl">🔥</span>
                                <h3 className="text-gray-700 font-medium text-sm sm:text-base">Streak</h3>
                            </div>

                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{streak}</h1>

                            <p className="text-xs sm:text-sm text-gray-500 mt-1">Hari Aktif</p>

                            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-2 sm:mt-3">
                                <div
                                    className="bg-gradient-to-r from-orange-400 to-red-500 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min((streak / 7) * 100, 100)}%` }}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm sm:shadow-md p-4 sm:p-5 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                <span className="text-xl">📈</span>
                                <h3 className="text-gray-700 font-medium text-sm sm:text-base">Intervensi</h3>
                            </div>

                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{day}/90</h1>

                            <p className="text-xs sm:text-sm text-gray-500 mt-1">Hari</p>

                            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-2 sm:mt-3">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-[#0072CE] h-1.5 sm:h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min((day / 90) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>             
                </div>
            </div>
        </div>
    );
}

export default Dashboard;