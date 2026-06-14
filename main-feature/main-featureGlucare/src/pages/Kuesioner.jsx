import { useState } from "react";
import Sidebar from "../components/Sidebar";
import HeaderAnalisis from "../components/HeaderAnalisis";
import iconBack from "../assets/iconBack.svg";
import iconNext from "../assets/iconNext.svg";
import iconFinish from "../assets/iconFinish.svg";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../hooks/useSidebar";
import axios from "axios";

const questions = [
    {
        question: "Berapa Usia Anda saat ini?",
        options: ["20-29 tahun", "30-39 tahun", "40+ tahun"],
    },
    {
        question: "Jenis kelamin Anda?",
        options: ["Laki-laki", "Perempuan"],
    },
    {
        question: "Bagaimana kategori BMI Anda?",
        options: ["Normal", "Overweight", "Obesitas"],
    },
    {
        question: "Bagaimana kondisi lingkar pinggang Anda?",
        options: ["Normal", "Berisiko"],
    },
    {
        question: "Apakah Anda memiliki hipertensi?",
        options: ["Ya", "Tidak"],
    },
    {
        question:
            "Apakah Anda pernah memiliki riwayat kelebihan berat badan?",
        options: ["Ya", "Tidak"],
    },
];

export default function Kuesioner() {
    const navigate = useNavigate();
    const { isOpen } = useSidebar();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    

    const handleSelect = (option) => {
        setAnswers({
            ...answers,
            [currentQuestion]: option,
        });
    };

    const handleNext = async () => {
        if (!answers[currentQuestion]) {
            alert("Silahkan pilih jawaban terlebih dahulu");
            return;
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            try {
                const currentUser = JSON.parse(
                    localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser")
                );

                const questionnaireData = {
                    age_band:
                        answers[0] === "20-29 tahun" 
                        ? 0 
                            : answers[0] === "30-39 tahun" 
                            ? 1 : 2,

                    gender:
                        answers[1] === "Laki-laki" ? 0: 1,

                    bmi_category:
                        answers[2] === "Normal" 
                        ? 0 
                            : answers[2] === "Overweight" 
                            ? 1 
                            : 2,

                    waist_category:
                        answers[3] === "Normal" 
                        ? 0 
                        : 1,
                    
                    hypertension:
                        answers[4] === "Ya" 
                        ? 1
                        : 0,
                    
                    overweight_history:
                        answers[5] === "Ya" 
                        ? 1
                        :0,
                };

                const response = await axios.post("http://localhost:5000/api/kuesioner/submit", {
                        user_id: currentUser?.id,
                        ...questionnaireData,
                    });

                navigate("/hasil", {
                    state: {
                        result: response.data,
                        input: questionnaireData,
                        mode:"questionnaire",}
                    });
            } catch (err) {
                console.error(err);
                alert("Gagal menyimpan kuesioner");
            }
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const current = questions[currentQuestion];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className={`flex-1 transition-all duration-300 ${isOpen ? 'lg:ml-60' : 'lg:ml-24'}`}>
                <HeaderAnalisis
                    title="Mode Kuesioner"
                    subtitle="Masukkan data untuk analisis AI"
                />

                <div className="px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 max-w-4xl lg:max-w-5xl mx-auto w-full">
                    
                    
                    <p className="text-xs sm:text-sm text-gray-500">
                        Pertanyaan {currentQuestion + 1} / {questions.length}
                    </p>

                    
                    <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-2xl shadow-sm lg:shadow-md mt-4">
                        <h2 className="text-base sm:text-lg lg:text-xl font-semibold mb-5 sm:mb-6 text-gray-800 leading-relaxed">
                            {current.question}
                        </h2>

                        <div className="flex flex-col gap-3 sm:gap-4">
                            {current.options.map((option, index) => (
                                <label
                                    key={index}
                                    className={`flex items-start lg:items-center gap-3 p-3 sm:p-4 rounded-xl border-2 cursor-pointer 
                                    group transition-all duration-200 hover:shadow-md hover:-translate-y-0.5
                                    ${
                                        answers[currentQuestion] === option
                                            ? "bg-[#0072CE] text-white border-[#0072CE] shadow-lg"
                                            : "bg-gray-50 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="option"
                                        checked={answers[currentQuestion] === option}
                                        onChange={() => handleSelect(option)}
                                        className="mt-0.5 sm:mt-1 w-4 h-4 accent-[#0072CE] flex-shrink-0"
                                    />
                                    <span className="text-sm sm:text-base leading-relaxed flex-1 min-w-0">
                                        {option}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    
                    <div className="mt-8 sm:mt-4 lg:mt-8 flex flex-col gap-4">

                        
                        <div className="flex justify-between items-center w-full">
                            <button
                                onClick={handleBack}
                                disabled={currentQuestion === 0}
                                className="flex items-center gap-4 text-gray-500 hover:text-gray-700 disabled:text-gray-300 
                                disabled:cursor-not-allowed text-sm sm:text-base font-medium transition-colors"
                            >
                                <img src={iconBack} className="w-8 h-4" alt="Kembali" />
                                Kembali
                            </button>

                            <div className="flex flex-col items-end gap-3">
                                <div className="flex gap-1.5 sm:gap-2">
                                    {questions.map((_, index) => (
                                        <span key={index} className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                                            index <= currentQuestion ? "bg-[#0072CE] scale-110 shadow-sm" : "bg-gray-300"
                                        }`}
                                        />
                                    ))}
                                </div>

                            <button
                                onClick={handleNext}
                                className="flex items-center justify-center gap-2 bg-gradient-to-r 
                                from-[#0072CE] to-[#3E97FF] text-white px-6 sm:px-8 py-3 sm:py-2.5 
                                rounded-xl font-semibold text-sm sm:text-base shadow-lg
                                hover:from-[#005fa8] hover:to-[#2f7de0] transition-colors duration-200"
                            >
                                {currentQuestion === questions.length - 1
                                    ? "Selesai"
                                    : "Selanjutnya"}

                                <img
                                    src={
                                        currentQuestion === questions.length - 1
                                            ? iconFinish
                                            : iconNext
                                    }
                                    className="w-4 h-4"
                                    alt="Next"
                                />
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}