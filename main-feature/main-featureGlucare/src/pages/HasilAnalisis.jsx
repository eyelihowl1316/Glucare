import Sidebar from "../components/Sidebar";
import HeaderAnalisis from "../components/HeaderAnalisis";
import Button from "../components/Button";
import warning from "../assets/warning.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useSidebar } from "../hooks/useSidebar";

const HasilAnalisis = () => {
    const navigate = useNavigate()
    const { isOpen } = useSidebar();
    const location = useLocation();

    const result = location.state?.result;
    const input = location.state?.input;
    const mode = location.state?.mode || "lab";

    const ageBandLabels = ["20-29 tahun", "30-39 tahun", "40+ tahun"];
    const bmiCategoryLabels = ["Normal", "Overweight", "Obesitas"];

    

    const score = (() => {
    if (!result) return 0;

    if (mode === "lab") {
        return result.risk_level === "Normal"
            ? (result.predict_proba[1] + result.predict_proba[2]) * 100
            : result.risk_level === "Prediabetes"
            ? result.predict_proba[2] * 100
            : result.predict_proba[2] * 100;
    }
    
    return 0;
})();

    const data = {
    score: score.toFixed(1),

    risk:
        mode === "lab"
            ? result?.risk_level || "-"
            : result?.risk_level === "low"
            ? "Risiko Rendah"
            : result?.risk_level === "medium"
            ? "Risiko Sedang"
            : "Risiko Tinggi",

    status:
        mode === "lab"
            ? result?.risk_level === "Normal"
                ? "Risiko rendah, tetap jaga pola hidup sehat!"
                : result?.risk_level === "Prediabetes"
                ? "Terdapat indikasi prediabetes"
                : "Terdapat indikasi diabetes"
            : result?.risk_level === "low"
            ? "Risiko diabetes rendah."
            : result?.risk_level === "medium"
            ? "Terdapat beberapa faktor risiko diabetes."
            : "Risiko diabetes tinggi, disarankan konsultasi lebih lanjut.",

    umur: 
        mode === "lab"
            ? `${input?.age ?? "-"} tahun`
            : ageBandLabels[input?.age_band] || "-",

    bmi: 
        mode === "lab"
            ? input?.bmi?.toFixed(1) ?? "-"
            : bmiCategoryLabels[input?.bmi_category] || "-",

    probabilitas:
        mode === "lab"
            ? result
                ? `${(
                    result.predict_proba[result.prediction_raw] * 100
                ).toFixed(1)}%`
                : "-"
            : "-"
};

    const riskColor =
    mode === "lab"
        ? result?.risk_level === "Normal"
            ? "text-green-600"
            : result?.risk_level === "Prediabetes"
            ? "text-yellow-600"
            : "text-red-600"
        : result?.risk_level === "low"
        ? "text-green-600"
        : result?.risk_level === "medium"
        ? "text-yellow-600"
        : "text-red-600";

    const barColor =
    mode === "lab"
        ? result?.risk_level === "Normal"
            ? "bg-green-500"
            : result?.risk_level === "Prediabetes"
            ? "bg-yellow-500"
            : "bg-red-500"
        : result?.risk_level === "low"
        ? "bg-green-500"
        : result?.risk_level === "medium"
        ? "bg-yellow-500"
        : "bg-red-500";

    const faktor = [];

    if (mode === "lab") {
        if (input?.glucose_fasting >= 126) 
        faktor.push("Gula darah puasa tinggi");
        if (input?.bmi >= 27.5) 
            faktor.push("BMI menunjukkan obesitas");
        if((input?.gender === 1 && input?.waist_cm >= 90) ||
            (input?.gender === 0 && input?.waist_cm >= 80) 
        ) {
            faktor.push("Lingkar pinggang berisiko");
        }
        if (input?.bp_systolic >= 140 || input?.bp_diastolic >= 90) {
            faktor.push("Tekanan darah tinggi");
        }
    }else {
        if (input?.bmi_category === 2)
        faktor.push("BMI menunjukkan obesitas");
    else if (input?.bmi_category === 1)
        faktor.push("BMI menunjukkan overweight");

    if (input?.waist_category === 1)
        faktor.push("Lingkar pinggang berisiko");

    if (input?.hypertension === 1)
        faktor.push("Memiliki riwayat hipertensi");

    if (input?.overweight_history === 1)
        faktor.push("Memiliki riwayat kelebihan berat badan"); 
    }
        
    if (faktor.length === 0) {
        faktor.push("Tidak ada faktor risiko utama teridentifikasi");
    }

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

                                <h1 className={`text-3xl font-bold ${riskColor}`}>
                                    {mode === "lab" ? `${data.score}%` : `${data.risk}`}
                                </h1>


                                <p className="text-sm text-gray-500 mb-2">
                                    {data.status}
                                </p>

                                {mode === "lab" && (
                                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                        <div
                                            className={`${barColor} h-2 rounded-full`}
                                            style={{ width: `${data.score}%` }}
                                        />
                                    </div>
                                )}


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
                                            BMI
                                        </p>
                                    </div>  

                                    {mode === "lab" && (
                                        <div className="bg-red-50 p-3 rounded-lg">
                                            <p className="font-semibold text-red-600">
                                                {data.probabilitas}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Probabilitas Diabetes
                                            </p>
                                        </div>  
                                    )}

                                    {mode === "questionnaire" && (
                                        <div className="bg-red-50 p-3 rounded-lg">
                                            <p className="font-bold text-red-600 text-lg">
                                                {data.risk}
                                            </p>
                                        </div>
                                    )}


                                    
                                </div>

                                <p className="text-gray-500 text-xs mt-4 max-w-md">
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
                                    {faktor.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            
                            {mode === "lab" && (
                                <div className="bg-blue-50 p-4 rounded-xl shadow">
                                    <h3 className="font-semibold mb-2">
                                        Interpetasi Lab
                                    </h3>

                                    <p className="text-sm text-gray-600">
                                        Gula Darah Puasa: {" "}{input?.glucose_fasting >= 126 ? "Tinggi" : "Normal"} <br></br>
                                        BMI : {" "}{input?.bmi >= 27.5 ? "Obesitas" : "Normal"} <br></br>
                                        Tekanan Darah: {" "}{input?.bp_systolic >= 140 ? "Tinggi" : "Normal"} <br></br>
                                    </p>
                                </div>
                            )}

                            {mode === "questionnaire" && (
                                <div className="bg-blue-50 p-4 rounded-xl shadow">
                                    <h3 className="font-semibold mb-2">
                                        Interpretasi Risiko
                                    </h3>

                                    <p className="text-sm text-gray-600">
                                        Penilaian risiko didasarkan pada usia,
                                        jenis kelamin, BMI, lingkar pinggang,
                                        riwayat hipertensi, dan riwayat kelebihan berat badan.
                                    </p>
                                </div>
                            )}

                            
                        </div>

                        <div className="flex flex-col items-center mt-8 gap-4">
                            <Button
                                variant="primary"
                                onClick={() => {
                                    const user = JSON.parse(localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser") || "{}");
                                    if (user?.id) {
                                        localStorage.setItem(`started90days_${user.id}`, "true");
                                    }
                                    navigate("/rencana");
                                }}
                            >
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