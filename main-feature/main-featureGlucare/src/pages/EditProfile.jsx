import { useState } from "react";
import Sidebar from "../components/Sidebar";
import HeaderAnalisis from "../components/HeaderAnalisis";
import Profile from "../assets/Profile.jpg";
import { useSidebar } from "../hooks/useSidebar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const navigate =useNavigate();

    const { isOpen } = useSidebar();

    const initialData = {
        nama: "Na Jaemin",
        jenisKelamin: "Laki-laki",
        email: "Najaemin0813@gmail.com",
        noTelepon: "081324567889",
        tanggalLahir: "2000-08-13",
        foto: Profile,
    };

    const [preview, setPreview] = useState(initialData.foto);
    const [form, setForm] = useState(initialData);

    const isChanged = () => {
        return (
            form.nama !== initialData.nama ||
            form.jenisKelamin !== initialData.jenisKelamin ||
            form.email !== initialData.email ||
            form.noTelepon !== initialData.noTelepon ||
            form.tanggalLahir !== initialData.tanggalLahir ||
            preview !== initialData.foto
        );
    };

 
    const handleChange = (e) => {
    const { name, value } = e.target;

    
    if (name === "noTelepon") {
        const onlyNumber = value.replace(/\D/g, "");
        setForm((prev) => ({
            ...prev,
            [name]: onlyNumber,
        }));
    } else {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
  };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!isChanged()) {
            return;
        }
        console.log("DATA:", form);
        alert("Profile berhasil diperbaharui");
        navigate("/pengaturan")
    };

  
    const handleUpload = (e) => {
    const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
            <div
            className={`flex-1 transition-all duration-300 ${
            isOpen ? "lg:ml-60" : "lg:ml-24"
        }`}
        >
            <HeaderAnalisis
                title="Profile Edit"
                subtitle="Edit informasi akun kamu"/>

            <div className="p-6 max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="text-center">
                        <p className="mb-2 font-medium">Foto Profile</p>

                        <div className="flex flex-col items-center gap-3">
                            <img src={preview} className="w-24 h-24 rounded-full object-cover border"/>
                            <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">
                                Ganti foto profil
                                <input type="file" hidden onChange={handleUpload} />
                            </label>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Nama</label>
                            <input
                                type="text"
                                name="nama"
                                value={form.nama}
                                onChange={handleChange}
                                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Jenis Kelamin</label>
                            <select
                                name="jenisKelamin"
                                value={form.jenisKelamin}
                                onChange={handleChange}
                                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100">
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100"/>
                        </div>

                        <div>
                            <label className="text-sm font-medium">No Telepon</label>
                            <input
                                type="tel"
                                name="noTelepon"
                                value={form.noTelepon}
                                onChange={handleChange}
                                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100"/>
                        </div>

                        <div>
                            <label className="text-sm font-medium">Tanggal Lahir</label>
                            <input
                                type="date"
                                name="tanggalLahir"
                                value={form.tanggalLahir}
                                onChange={handleChange}
                                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100"/>
                        </div>
                    </div>
                    
                    <div className="flex justify-center mt-6">
                        <Button variant="primary" type="submit">
                            Simpan Perubahan
                        </Button>
                    </div>

                </form>
            </div>
        </div>
        </div>
    </div>
  );
}