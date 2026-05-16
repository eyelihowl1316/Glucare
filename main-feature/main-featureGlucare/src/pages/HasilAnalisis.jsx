import Sidebar from "../components/Sidebar";
import HeaderAnalisis from "../components/HeaderAnalisis";
import Button from "../components/Button";
import warning from "../assets/warning.png";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../hooks/useSidebar";

const HasilAnalisis = () => {
    const navigate = useNavigate()
    const { isOpen } = useSidebar();

    const data ={
        score: 80,
        risk :"Risiko Tinggi",
        status : "Indikasi Diabetes",
        umur:"30 tahun",
        bmi:"42",
        risikoTambahan: "42%",
        faktor: [
            "HbA1c >= 6.5% - mengarah diabetes",
            "Gula puasa normal",
            "BMI >= 27.5 - obesitas",
        ],
        interpretasi : {
            hba1c : "Diabetes",
            gdp : "Normal",
        },
    };
    
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">

                <div className={`flex-1 transition-all duration-300 ${isOpen ? 'lg:ml-60' : 'lg:ml-24'}`}>
                <HeaderAnalisis
                    title="Hasil Analisis"
                    subtitle="Skor risiko prediabetes personalmu"
                />

                <main className="p-4 mt-6">
                    <div className="bg-white rounded-2xl border border-red-300 p-6 shadow-sm max-w-5xl mx-auto">
                        <div className="flex flex-col items-center text-center">
                            <img src={warning}alt="warning" className="w-18 h-16 mb-2"/>

                            <div className="text-red-500 text-4xl mb-4">

                                <h1 className="text-3xl font-bold text-red-600">
                                    {data.score}%
                                </h1>

                                <p className="text-sm text-red-500 mb-2">
                                    {data.risk}
                                </p>

                                <p className="text-sm text-gray-500 mb-2">
                                    {data.status}
                                </p>

                                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                    <div className="bg-red-500 h-2 rounded-full" style={{width : `${data.score}%`}}>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 w-full text-sm">
                                    <div className="bg-red-50 p-3 rounded-lg">
                                        <p className="font-semibold text-red-600">
                                            {data.umur}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Usia Kronologis
                                        </p>
                                    </div>

                                    <div className="bg-red-50 p-3 rounded-lg">
                                        <p className="font-semibold text-red-600">
                                            {data.bmi}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Usia Metabolik
                                        </p>
                                    </div>  
                                    <div className="bg-red-50 p-3 rounded-lg">
                                        <p className="font-semibold text-red-600">
                                            {data.risikoTambahan}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Risiko 5 Tahun
                                        </p>
                                        </div>  
                                </div>

                                <p className="text-gray-500 text-xs mt-4 max-w-md">
                                    Segera konsultasikan ke dokter.<br></br>
                                    Program intervensi 90 hari Glucare sangat direkomendasikan
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mt-6 max-w-5xl mx-auto">

                            <div className="bg-white p-4 rounded-xl shadow">
                                <h3 className="font-semibold mb-2">
                                    Faktor Risiko Teridentifikasi
                                </h3>
                                <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                                    {data.faktor.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-xl shadow">
                                <h3 className="font-semibold mb-2">
                                    Interpetasi Lab
                                </h3>

                                <p className="text-sm text-gray-600">
                                    HbA1c:{data.interpretasi.hba1c} <br />
                                    GDP: {data.interpretasi.gdp}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center mt-8 gap-4">
                            <Button variant="primary"  onClick={() => navigate("/rencana")}>
                                Mulai rencana 90 hari
                            </Button>
                            <Button variant ="secondary" onClick={() => navigate("/analisis")}>
                                Cek ulang risiko
                            </Button>
                        </div>
                    </div>
                </main>
                </div>
            </div>
        </div>
    );
};

export default HasilAnalisis;