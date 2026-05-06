import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AuthPage() {
    const navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        agree: false,
    });

    const handleLogin = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            (user) =>
                user.email === loginData.email.trim().toLowerCase() &&
                user.password === loginData.password
        );

        if (user) {
            if (loginData.remember) {
                localStorage.setItem("currentUser", JSON.stringify(user));
            } else {
                sessionStorage.setItem("currentUser", JSON.stringify(user));
            }
            navigate("/beranda");
        } else {
            alert("Email atau password salah");
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (!signupData.name || !signupData.email || !signupData.password) {
            alert("Semua field harus diisi");
            return;
        }

        if (!signupData.agree) {
            alert("Setujui syarat & ketentuan");
            return;
        }

        if (signupData.password.length < 8) {
            alert("Password minimal 8 karakter");
            return;
        }

        const userExists = users.find(
            (user) => user.email === signupData.email.trim().toLowerCase()
        );

        if (userExists) {
            alert("Email sudah terdaftar");
            return;
        }

        const newUser = {
            name: signupData.name.trim(),
            email: signupData.email.trim().toLowerCase(),
            password: signupData.password.trim(),
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        sessionStorage.setItem("currentUser", JSON.stringify(newUser));
    
        setSignupData({
            name: "",
            email: "",
            password: "",
            agree: false,
        });

        navigate("/input");
    };

    return (
        <div className="h-screen overflow-hidden bg-white font-[Poppins]">
            <Navbar />

            <div className="fixed inset-0 flex items-center justify-center pt-24">
                <div className="relative w-[90vw] max-w-[1200px] h-[80vh] rounded-[40px] shadow-2xl overflow-hidden bg-white">

                    <div
                        className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-700 ${
                        isActive ? "translate-x-full opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
                        }`}>
                        <form
                            onSubmit={handleLogin}
                            className="h-full flex flex-col justify-center items-center px-10">
                            <h1 className="text-4xl font-bold">Masuk</h1>
                            <p className="my-5 text-sm">Gunakan akun email untuk masuk</p>

                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-gray-100 rounded-lg p-3 mb-3"
                                value={loginData.email}
                                onChange={(e) =>
                                    setLoginData({ ...loginData, email: e.target.value })
                                }/>

                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-gray-100 rounded-lg p-3 mb-3"
                                value={loginData.password}
                                onChange={(e) =>
                                    setLoginData({ ...loginData, password: e.target.value })
                                }/>

                            <div className="w-full flex justify-between items-center mb-4 text-sm relative z-10">
                                <label className="flex items-center gap-2 whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        checked={loginData.remember}
                                        onChange={(e) =>
                                            setLoginData({
                                                ...loginData,
                                                remember: e.target.checked,
                                            })
                                        }
                                    />
                                    Ingatkan saya
                                </label>

                                <a href="#" className="text-sm hover:text-[#0072ce] cursor-pointer">
                                    Lupa Kata Sandi?
                                </a>
                            </div>

                            <button 
                                type="submit"
                                className="bg-[#0072CE] hover:bg-gradient-to-r hover:from-[#0072CE] hover:to-[#003A68] text-white px-10 py-3 rounded-lg font-bold transition">
                                Masuk
                            </button>
                        </form>
                    </div>

                    <div
                        className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-700 ${
                        isActive ? "translate-x-full opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                        }`}>
                        <form
                            onSubmit={handleSignup}
                            className="h-full flex flex-col justify-center items-center px-10">
                            <h1 className="text-4xl font-bold">Buat Akun</h1>
                            <p className="my-5 text-sm">Gunakan email untuk registrasi</p>

                            <input
                                type="text"
                                placeholder="Nama"
                                className="w-full bg-gray-100 rounded-lg p-3 mb-3"
                                value={signupData.name}
                                onChange={(e) =>
                                    setSignupData({ ...signupData, name: e.target.value })
                                }/>

                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-gray-100 rounded-lg p-3 mb-3"
                                value={signupData.email}
                                onChange={(e) =>
                                    setSignupData({ ...signupData, email: e.target.value })
                                }/>

                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-gray-100 rounded-lg p-3 mb-3"
                                value={signupData.password}
                                onChange={(e) =>
                                    setSignupData({
                                        ...signupData,
                                        password: e.target.value,
                                    })
                                }/>

                            <label className="text-sm flex gap-2 mb-4">
                                <input
                                    type="checkbox"
                                    checked={signupData.agree}
                                    onChange={(e) =>
                                        setSignupData({
                                            ...signupData,
                                            agree: e.target.checked,
                                        })
                                    }/>
                                <span> Saya setuju{" "} 
                                    <span
                                        onClick={(e) => {e.preventDefault(); setShowModal(true)}}
                                        className="text-blue-600 underline cursor-pointer"> Kebijakan Privasi
                                    </span>
                                </span>
                            </label>

                            <button 
                                type="submit"
                                className="bg-[#0072CE] hover:bg-gradient-to-r hover:from-[#0072CE] hover:to-[#003A68] text-white px-10 py-3 rounded-lg font-bold transition">
                                Daftar
                            </button>
                        </form>
                    </div>

                    <div
                        className={`absolute top-0 h-full w-1/2 bg-gradient-to-b from-[#0072CE] to-[#003A68] text-white flex flex-col justify-center items-center px-10 transition-all duration-700 ${
                        isActive ? "left-0" : "left-1/2"
                        }`}>
                        {!isActive ? (
                            <>
                                <h1 className="text-4xl font-bold">Halo, Teman!</h1>
                                <p className="my-5 text-center">
                                    Belum punya akun?
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setIsActive(true)}
                                    className="bg-white text-black px-10 py-3 rounded-lg font-bold">
                                    Daftar
                                </button>
                            </>
                        ) : (
                            <>
                                <h1 className="text-4xl font-bold">
                                    Selamat Datang Kembali
                                </h1>
                                <p className="my-5 text-center">
                                    Sudah punya akun?
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setIsActive(false)}
                                    className="bg-white text-black px-10 py-3 rounded-lg font-bold">
                                    Masuk
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
                    <div className="bg-white w-[400px] max-w-[90%] max-h-[80vh] rounded-2xl p-5 relative flex flex-col">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="absolute right-4 top-3 text-2xl cursor-pointer"> ×
                        </button>

                        <h2 className="text-2xl font-bold leading-tight mb-4 pr-8">
                            Kebijakan Privasi & Syarat Ketentuan
                        </h2>

                        <div className="overflow-y-auto mt-2 pr-2 text-sm leading-7 text-black">
                            <h3 className="text-lg font-semibold">Kebijakan Privasi</h3>
                            <p>Kami menghargai privasi Anda. Informasi yang kami kumpulkan:</p>

                            <ul className="list-disc pl-5">
                                <li>Data akun (Nama, Email)</li>
                                <li>Data pengguna aplikasi</li>
                            </ul>
                            <br />

                            <p>Kami menggunakan data untuk:</p>
                            <ul className="list-disc pl-5">
                                <li>Meningkatkan layanan</li>
                                <li>Memberikan pengalaman pengguna lebih baik</li>
                            </ul>
                            <br />

                            <h3 className="text-lg font-semibold">Syarat & Ketentuan</h3>
                            <p>Dengan menggunakan aplikasi ini, Anda setuju untuk:</p>

                            <ul className="list-disc pl-5">
                                <li>Tidak menyalahgunakan layanan</li>
                                <li>Tidak melanggar hukum</li>
                                <li>Menjaga keamanan akun</li>
                            </ul>
                            <br />

                            <p>Kami berhak:</p>
                            <ul className="list-disc pl-5">
                                <li>Menghapus akun jika Anda melanggar aturan</li>
                                <li>Mengubah layanan sewaktu-waktu</li>
                            </ul>

                            <p className="mt-5">Terakhir diperbarui 29-03-2026</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}