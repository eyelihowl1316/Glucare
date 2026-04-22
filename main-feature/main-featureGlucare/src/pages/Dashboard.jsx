import { useEffect, useState} from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const navigate = useNavigate();

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
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 ml-8">
                <div className="max-w-5xl mx-auto">
                    
                    <div className="flex items-center gap-3 mb-6">
                        <img src="" className="w-14 h-14 rounded-full object-cover"/>
                        <div>
                        
                            <p className="text-sm text-gray-500">
                                {greeting}
                            </p>

                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                                Halo, Username 👋
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="mt-10 max-w-5xl  bg-gradient-to-r from-[#0072CE] to-[#3E97FF] text-white p-6 rounded-2xl shadow-md">

                    <p className="text-sm opacity-90">Status Risiko</p>

                    <h3 className="text-xl font-bold mt-1">
                        {riskData ? riskData.status : "Belum ada data"}
                    </h3>

                    <p className="text-sm mt-2 opacity-90">
                        Yuk mulai penilaian untuk melihat kondisi kesehatan Anda saat ini.
                    </p>

                    <button 
                        onClick={() => navigate("/analisis")}
                        className="mt-4 w-full bg-white text-[#0072CE] font-semibold py-3 rounded-xl hover:bg-gray-100 transition"
                    >
                        {riskData ? "Cek Kembali Risiko Anda":"Cek Risiko Anda Sekarang"}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-w-5xl">

    <div className="bg-white rounded-2xl shadow p-5">
        <div className="flex items-center gap-2 mb-2">
            <span>🔥</span>
            <h3 className="text-gray-700 font-medium">Streak</h3>
        </div>

        <h1 className="text-2xl font-bold">{streak}</h1>

        <p className="text-sm text-gray-500 mt-1">Hari Aktif</p>

        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
                className="bg-gray-400 h-2 rounded-full"
                style={{ width: `${(streak / 7) * 100}%` }}
            />
        </div>
    </div>

    <div className="bg-white rounded-2xl shadow p-5">
        <div className="flex items-center gap-2 mb-2">
            <span>📈</span>
            <h3 className="text-gray-700 font-medium">Intervensi</h3>
        </div>

        <h1 className="text-2xl font-bold">{day}/90</h1>

        <p className="text-sm text-gray-500 mt-1">Hari</p>

        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(day / 90) * 100}%` }}
            />
        </div>
    </div>

</div>             
            </div>
        </div>
    );
}

export default Dashboard;