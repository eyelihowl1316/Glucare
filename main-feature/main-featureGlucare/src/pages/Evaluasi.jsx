import Sidebar from "../components/Sidebar";
import HeaderEvaluasiPencapaian from "../components/HeaderEvaluasiPencapaian";
import StatsCard from "../components/StatsCard";
import PerbandinganRisiko from "../components/PerbandinganRisiko";
import MetrikMetabolik from "../components/MetrikMetabolik";
import FaktorRisiko from "../components/FaktorRisiko";
import Button from "../components/Button";
import { useSidebar } from "../hooks/useSidebar";
import { useNavigate } from "react-router-dom";


export default function Evaluasi() {
    const navigate = useNavigate();
    const { isOpen } = useSidebar();

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />

            <div className={`flex-1 transition-all duration-300 ${isOpen ? 'lg:ml-60' : 'lg:ml-24'}`}>
                <HeaderEvaluasiPencapaian
                    title="Evaluasi"
                    subtitle="Pantau intervensi metabolik harianmu"
                />
                <div className="px-8 lg:px-12 py-8 space-y-8">
                    <StatsCard 
                        fromColor="from-[#0A0A0A]" 
                        toColor="to-[#8864D2]" />
                </div>

                <div className="p-6">
                    <PerbandinganRisiko 
                        before={{ value: 96, label: "Tinggi", date:"2026-04-11"}}
                        after={{value: 93, label:"Tinggi", date:"2026-04-17"}}
                        improvementText="Skor turun 3 poin - ada perbaikan!"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <MetrikMetabolik />
                    <FaktorRisiko />
                </div>

                <div className="flex justify-end mt-4 mb-4">
                    <Button variant="primary"  
                        onClick={() => navigate("/analisis")}>
                        ⟳  Lakukan Re-Assessment
                    </Button>
                </div>
            </div>
        </div>
    );
}