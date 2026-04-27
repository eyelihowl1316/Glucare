import Sidebar from "../components/Sidebar";
import HeaderAnalisis from "../components/HeaderAnalisis";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../hooks/useSidebar";
import StatsCards_90Day from '../components/StatsCard_90Day';
import TargetHariIni from '../components/TargetHariIni';
import FaseIntervensi from '../components/FaseIntevensi';
import TaskList from '../components/TaskList';
import ActivityChart from '../components/ActivityChart';


export default function Rencana90Hari() {
    const navigate = useNavigate();
    const { isOpen } = useSidebar();

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />

            <div className={`flex-1 transition-colors duration-300 ${isOpen ? 'lg:ml-60' : 'lg:ml-24'}`}>
                <HeaderAnalisis
                    title="Rencana 90 Hari"
                    subtitle="Pantau intervensi metabolik harianmu"
                />

                <div className="px-8 lg:px-12 py-8 space-y-8">
                    <StatsCards_90Day />
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="relative w-20 h-20">
                                <div className="absolute inset-0 rounded-full bg-gray-200"></div>
                                <div className="absolute inset-0 rounded-full" style={{background: "conic-gradient(#0072CE 0% 5%, #E5E7EB 5% 100%)"}}/>
                                <div className="absolute inset-[6px] bg-white rounded-full flex flex-col items-center justify-center">
                                    <span className="text-sm font-bold text-gray-800">5%</span>
                                    <span className="text-[10px] text-gray-400">selesai</span>
                                </div>
                            </div>

                            <div>
                                <p className="font-semibold text-gray-800">Intervensi 90 Hari</p>
                                <p className="text-sm text-gray-500">Hari ke-5 dari 90</p>
                                <p className="text-xs text-[#0072CE] mt-1">85 hari tersisa - Fase 1/3</p>
                            </div>
                        </div>

                        <Button variant="primary" onClick={() => navigate("/evaluasi")}>
                            Evaluasi
                        </Button>
                    </div>

                    <div className="mt-5">
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-[#0072CE] rounded-full w-[5%]" />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">5%</p>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-gray-800 mt-2 pl-4 ">Target hari ini</h2>
                        <span className="text-sm text-[#0072CE]">Hari 5</span>
                    </div>

                        <div className="mt-6">
                            <TargetHariIni />
                        </div>

                        <div className="flex justify-end mt-6">
                            <Button variant="primary" onClick={() => navigate("/pencapaian")}>
                                Lihat Pencapaian
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6 pl-4">
                        <h3 className="font-semibold text-gray-800 mb-4">Fase Intervensi</h3>

                        <div className="space-y-4">
                            <FaseIntervensi />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold text-gray-800">Level & XP</h3>
                            <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                                ⚡ Level 8
                            </span>
                        </div>

                        <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-orange-400 rounded-full w-[85%]" />
                        </div>

                        <div className="flex justify-between text-xs mt-2">
                            <span className="text-gray-400">2195 / 2400 XP</span>
                            <span className="text-orange-500">205 XP lagi ke level 9</span>
                        </div>
                    </div>  

                    <div className="mt-6 pl-4">
                        <div className="space-y-3">
                            <TaskList />
                        </div>
                    </div>

                    <div>
                        <ActivityChart />
                    </div>

                    <div
                        onClick={() => navigate("/analisis")}
                        className="flex items-center justify-between border border-yellow-300 bg-yellow-50 rounded-xl px-4 py-3 mt-4 cursor-pointer hover:bg-yellow-100 transition mb-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-200 text-yellow-600">
                                ⟳
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-700">
                                    Cek ulang risiko
                                </p>
                                <p className="text-xs text-yellow-600">
                                    Cek ulang untuk memperbaharui data
                                </p>
                            </div>
                        </div>
                        <span className="text-yellow-600 text-lg">›</span>
                    </div>
                </div>
            </div>
    );
}