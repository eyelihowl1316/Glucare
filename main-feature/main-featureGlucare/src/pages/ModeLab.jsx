import { useState } from "react";
import Sidebar from "../components/Sidebar";
import HeaderAnalisis from "../components/HeaderAnalisis";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../hooks/useSidebar";

export default function ModeLab() {
    const navigate = useNavigate();
    const { isOpen } = useSidebar();

    const [form, setForm] = useState({
        hba1c: "",
        gula: "",
        berat: "",
        tinggi: "",
        riwayatKeluarga: "",
        riwayatDiabetes: "",
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
                [name]: ""
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        
        if (!form.hba1c || form.hba1c === "") newErrors.hba1c = "HbA1c wajib diisi";
        if (!form.gula || form.gula === "") newErrors.gula = "Gula darah wajib diisi";
        if (!form.berat || form.berat === "") newErrors.berat = "Berat badan wajib diisi";
        if (!form.tinggi || form.tinggi === "") newErrors.tinggi = "Tinggi badan wajib diisi";

        
        if (!form.riwayatKeluarga || form.riwayatKeluarga === "") newErrors.riwayatKeluarga = "Pilih riwayat keluarga";
        if (!form.riwayatDiabetes || form.riwayatDiabetes === "") newErrors.riwayatDiabetes = "Pilih riwayat diabetes";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            navigate("/loading");
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
                            <label className="text-sm text-black font-semibold">HbA1c (%) <span className="text-xs text-gray-500 font-normal">(hanya bisa diisi oleh angka)</span></label>
                            <div className="relative mt-1">
                                <input
                                    type="text"
                                    name="hba1c"
                                    value={form.hba1c}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none ${
                                        errors.hba1c ? "border border-red-300 bg-red-50" : ""
                                    }`}
                                />
                                <span className="absolute right-4 top-3 text-[#0072CE] text-sm">%</span>
                            </div>
                            {errors.hba1c && (
                                <p className="text-xs text-red-500 mt-1">{errors.hba1c}</p>
                            )}
                            <p className="text-xs text-gray-400 mt-1">
                                Normal: &lt; 5.7 • Prediabetes: 5.7–6.4 • Diabetes: ≥6.5
                            </p>
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
                    </div>

                    
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-sm text-black-600 mb-3">
                            Riwayat Keluarga Diabetes
                        </p>

                        <div className="flex gap-2">
                            {["Ya", "Tidak", "Tidak Tahu"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => handleSelect("riwayatKeluarga", item)}
                                    className={`px-4 py-2 rounded-full text-sm transition ${
                                        form.riwayatKeluarga === item
                                            ? "bg-[#0072CE] text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                                    } ${errors.riwayatKeluarga ? "ring-1 ring-red-200" : ""}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        {errors.riwayatKeluarga && (
                            <p className="text-xs text-red-500 mt-2">{errors.riwayatKeluarga}</p>
                        )}
                    </div>

                    
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-sm text-black-600 mb-3">
                            Riwayat Diabetes
                        </p>

                        <div className="flex gap-2">
                            {["Ya", "Tidak"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => handleSelect("riwayatDiabetes", item)}
                                    className={`px-4 py-2 rounded-full text-sm transition ${
                                        form.riwayatDiabetes === item
                                            ? "bg-[#0072CE] text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                                    } ${errors.riwayatDiabetes ? "ring-1 ring-red-200" : ""}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        {errors.riwayatDiabetes && (
                            <p className="text-xs text-red-500 mt-2">{errors.riwayatDiabetes}</p>
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