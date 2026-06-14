import {useState } from "react";
import Sidebar from "../components/Sidebar";
import HeaderAnalisis from "../components/HeaderAnalisis";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../hooks/useSidebar";
import axios from "axios";

export default function ModeLab() {
    const navigate = useNavigate();
    const { isOpen } = useSidebar();

    const [form, setForm] = useState({
        usia: "",
        gula: "",
        berat: "",
        tinggi: "",
        lingkarPinggang: "",
        hdl: "",
        trigliserida: "",
        sistolik: "",
        diastolik: "",
        gender: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value) || value === "") {
            setForm({
                ...form,
                [e.target.name]: value,
            });
            if (errors[e.target.name]) {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            }
        }
    };

    const handleSelect = (name, value) => {
        setForm({
            ...form,
            [name]: value,
        });
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        Object.entries(form).forEach(([key, value]) => {
            if (!value) {
                newErrors[key] = "Field ini wajib diisi";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const currentUser = JSON.parse(
                    localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser")
                );

                const response = await axios.post("http://localhost:5000/api/lab/submit", {
                        user_id: currentUser?.id,
                        age: parseInt(form.usia),
                        gender: form.gender === "Laki-Laki" ? 1 : 0,
                        glucose_fasting: parseFloat(form.gula),
                        waist_cm: parseFloat(form.lingkarPinggang),
                        weight: parseFloat(form.berat),
                        height: parseFloat(form.tinggi),
                        hdl: parseFloat(form.hdl),
                        triglycerides: parseFloat(form.trigliserida),
                        bp_systolic: parseInt(form.sistolik),
                        bp_diastolic: parseInt(form.diastolik),
                    });

                const bmi = (parseFloat(form.berat) / Math.pow(parseFloat(form.tinggi) / 100, 2)).toFixed(1);

                navigate("/hasil", {
                    state: {
                        result: response.data,
                        input: {
                            age: parseInt(form.usia),
                            glucose_fasting: parseFloat(form.gula),
                            waist_cm: parseFloat(form.lingkarPinggang),
                            bmi: parseFloat(bmi),
                            bp_systolic: parseInt(form.sistolik),
                            bp_diastolic: parseInt(form.diastolik),
                            gender: form.gender === "Laki-Laki" ? 1 : 0,
                        },
                        mode:"lab"
                    },
                });
            } catch (err) {
                console.error("Gagal submit data lab:", err);
                alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
            }
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />

            <div className={`flex-1 transition-all duration-300 overflow-y-auto ${
                isOpen ? "lg:ml-60" : "lg:ml-24"
            }`}>
                <HeaderAnalisis
                    title="Mode Lab"
                    subtitle="Masukkan data untuk analisis AI"
                />

                <div className="px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 max-w-4xl lg:max-w-5xl mx-auto w-full space-y-6">
                    <p className="text-gray-700 opacity-80 text-sm">Masukkan hasil pemeriksaan laboratorium terbaru Anda</p>
                    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">

                        <div>
                            <label className="text-sm text-black font-semibold">Usia<span className="text-xs text-gray-500 font-normal">(hanya bisa diisi oleh angka)</span></label>
                            <div className="relative mt-1">
                                <input
                                    type="text"
                                    name="usia"
                                    value={form.usia}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none ${
                                        errors.usia ? "border border-red-300 bg-red-50" : ""
                                    }`}
                                />
                                <span className="absolute right-4 top-3 text-[#0072CE] text-sm">tahun</span>
                            </div>
                            {errors.usia && (
                                <p className="text-xs text-red-500 mt-1">{errors.usia}</p>
                            )}
                        </div>

                        
                        <div>
                            <label className="text-sm text-black font-semibold">Gula Darah Puasa (mg/dL) <span className="text-xs text-gray-500 font-normal">(hanya bisa diisi oleh angka)</span></label>
                            <div className="relative mt-1">
                                <input
                                    type="text"
                                    name="gula"
                                    value={form.gula}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none ${
                                        errors.gula ? "border border-red-300 bg-red-50" : ""
                                    }`}
                                />
                                <span className="absolute right-4 top-3 text-[#0072CE] text-sm">mg/dL</span>
                            </div>
                            {errors.gula && (
                                <p className="text-xs text-red-500 mt-1">{errors.gula}</p>
                            )}
                            <p className="text-xs text-gray-400 mt-1">
                                Normal: &lt; 100 • Prediabetes: 100–125 • Diabetes: ≥126
                            </p>
                        </div>

                        
                        <div>
                            <label className="text-sm text-black font-semibold">Berat Badan (kg) <span className="text-xs text-gray-500 font-normal">(hanya bisa diisi oleh angka)</span></label>
                            <div className="relative mt-1">
                                <input
                                    type="text"
                                    name="berat"
                                    value={form.berat}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none ${
                                        errors.berat ? "border border-red-300 bg-red-50" : ""
                                    }`}
                                />
                                <span className="absolute right-4 top-3 text-[#0072CE] text-sm">kg</span>
                            </div>
                            {errors.berat && (
                                <p className="text-xs text-red-500 mt-1">{errors.berat}</p>
                            )}
                        </div>

                        
                        <div>
                            <label className="text-sm text-black font-semibold">Tinggi Badan (cm) <span className="text-xs text-gray-500 font-normal">(hanya bisa diisi oleh angka)</span></label>
                            <div className="relative mt-1">
                                <input
                                    type="text"
                                    name="tinggi"
                                    value={form.tinggi}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none ${
                                        errors.tinggi ? "border border-red-300 bg-red-50" : ""
                                    }`}
                                />
                                <span className="absolute right-4 top-3 text-[#0072CE] text-sm">cm</span>
                            </div>
                            {errors.tinggi && (
                                <p className="text-xs text-red-500 mt-1">{errors.tinggi}</p>
                            )}
                            <p className="text-xs text-gray-400 mt-1">
                                BMI akan dihitung otomatis
                            </p>
                        </div>

                        <div>
                            <label className="text-sm text-black font-semibold">Lingkar Pinggang<span className="text-xs text-gray-500 font-normal">(hanya bisa diisi oleh angka)</span></label>
                            <div className="relative mt-1">
                                <input
                                    type="text"
                                    name="lingkarPinggang"
                                    value={form.lingkarPinggang}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none ${
                                        errors.lingkarPinggang ? "border border-red-300 bg-red-50" : ""
                                    }`}
                                />
                                <span className="absolute right-4 top-3 text-[#0072CE] text-sm">cm</span>
                            </div>
                            {errors.lingkarPinggang && (
                                <p className="text-xs text-red-500 mt-1">{errors.lingkarPinggang}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm text-black font-semibold">HDL<span className="text-xs text-gray-500 font-normal">(hanya bisa diisi oleh angka)</span></label>
                            <div className="relative mt-1">
                                <input
                                    type="text"
                                    name="hdl"
                                    value={form.hdl}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none ${
                                        errors.hdl ? "border border-red-300 bg-red-50" : ""
                                    }`}
                                />
                                <span className="absolute right-4 top-3 text-[#0072CE] text-sm">mg/dL</span>
                            </div>
                            {errors.hdl && (
                                <p className="text-xs text-red-500 mt-1">{errors.hdl}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm text-black font-semibold">trigliserida<span className="text-xs text-gray-500 font-normal">(hanya bisa diisi oleh angka)</span></label>
                            <div className="relative mt-1">
                                <input
                                    type="text"
                                    name="trigliserida"
                                    value={form.trigliserida}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none ${
                                        errors.trigliserida ? "border border-red-300 bg-red-50" : ""
                                    }`}
                                />
                                <span className="absolute right-4 top-3 text-[#0072CE] text-sm">mg/dL</span>
                            </div>
                            {errors.trigliserida && (
                                <p className="text-xs text-red-500 mt-1">{errors.trigliserida}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm text-black font-semibold">sistolik<span className="text-xs text-gray-500 font-normal">(hanya bisa diisi oleh angka)</span></label>
                            <div className="relative mt-1">
                                <input
                                    type="text"
                                    name="sistolik"
                                    value={form.sistolik}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none ${
                                        errors.sistolik ? "border border-red-300 bg-red-50" : ""
                                    }`}
                                />
                                <span className="absolute right-4 top-3 text-[#0072CE] text-sm">mmHg</span>
                            </div>
                            {errors.sistolik && (
                                <p className="text-xs text-red-500 mt-1">{errors.sistolik}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm text-black font-semibold">Diastolik<span className="text-xs text-gray-500 font-normal">(hanya bisa diisi oleh angka)</span></label>
                            <div className="relative mt-1">
                                <input
                                    type="text"
                                    name="diastolik"
                                    value={form.diastolik}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none ${
                                        errors.diastolik ? "border border-red-300 bg-red-50" : ""
                                    }`}
                                />
                                <span className="absolute right-4 top-3 text-[#0072CE] text-sm">mmHg</span>
                            </div>
                            {errors.diastolik && (
                                <p className="text-xs text-red-500 mt-1">{errors.diastolik}</p>
                            )}
                        </div>
                    </div>

                    
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-sm text-black-600 mb-3">
                            Jenis Kelamin
                        </p>

                        <div className="flex gap-2">
                            {["Laki-Laki", "Perempuan"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => handleSelect("gender", item)}
                                    className={`px-4 py-2 rounded-full text-sm transition ${
                                        form.gender === item
                                            ? "bg-[#0072CE] text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                                    } ${errors.gender ? "ring-1 ring-red-200" : ""}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        {errors.gender && (
                            <p className="text-xs text-red-500 mt-2">{errors.gender}</p>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={handleSubmit}
                            className="bg-gradient-to-r from-[#0072CE] to-[#3E97FF] text-white px-8 py-3 rounded-xl font-semibold shadow-lg
                            hover:from-[#005fa8] hover:to-[#2f7de0] transition-colors duration-200"
                        >
                            Analisis Sekarang
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}