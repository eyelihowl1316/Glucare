import { useState } from "react";
import Sidebar from "../components/Sidebar";
import HeaderAnalisis from "../components/HeaderAnalisis";
import { useSidebar } from "../hooks/useSidebar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

export default function ChangePassword() {
    const { isOpen } = useSidebar();
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);

    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
    const { name, value } = e.target;
        setForm((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const isChanged = () => {
        return (
            form.oldPassword ||
            form.newPassword ||
            form.confirmPassword
            );
        };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isChanged()) return;
        
        if (form.newPassword !== form.confirmPassword) {
            setAlert({ type: "error", message: "Password baru tidak sama"});
            return;
        }       

        if (form.newPassword.length < 6) {
            setAlert({ type: "warning", message: "Password minimal 6 karakter"});
            return;
        }

        console.log("PASSWORD DATA:", form);

            setAlert({ type: "success", message: "Password berhasil diubah"});
                navigate("/pengaturan");
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />

                <div className="flex-1 flex flex-col">
                    <div
                        className={`flex-1 transition-all duration-300 ${
                            isOpen ? "lg:ml-60" : "lg:ml-24"}`}>
                                
                                <HeaderAnalisis title="Ubah kata sandi" subtitle="Ubah kata sandi Anda"/>
                                
                                <div className="p-6 max-w-2xl">
                                    {alert && (
                                        <div className="mb-4">
                                            <Alert type={alert.type} message={alert.message} onClose={()=> setAlert(null)}/>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="text-sm font-medium">Old Password</label>
                                            <input
                                            type="password"
                                            name="oldPassword"
                                            value={form.oldPassword}
                                            onChange={handleChange}
                                            placeholder="Masukkan password lama"
                                            className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none"
                                            />
                                        </div>

             
                                        <div>
                                            <label className="text-sm font-medium">New Password</label>
                                            <input
                                            type="password"
                                            name="newPassword"
                                            value={form.newPassword}
                                            onChange={handleChange}
                                            placeholder="Masukkan password baru"
                                            className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none"/>
                                        </div>
             
                                        <div>
                                            <label className="text-sm font-medium">Confirm Password</label>
                                            <input
                                            type="password"
                                            name="confirmPassword"
                                            value={form.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Ulangi password baru"
                                            className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none"
                                            />
                                        </div>

                                        <div className="flex justify-end mt-6">
                                            <Button type="submit" variant="primary">
                                            Confirm Password
                                            </Button>
                                        </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
            );
}