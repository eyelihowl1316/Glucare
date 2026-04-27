import Sidebar from "../components/Sidebar";
import HeaderEvaluasiPencapaian from "../components/HeaderEvaluasiPencapaian";
import StatsCard from "../components/StatsCard";
import AchivementCard from "../components/AchievementCard";
import { useSidebar } from "../hooks/useSidebar";
import BelumDiraih from "../components/BelumDiraih";



export default function Evaluasi() {
    const { isOpen } = useSidebar();

    const achievements = [
        {   
            id: 1,
            icon: "⭐",
            title: "First Step",
            description: "Selesaikan tugas pertama",
            xp: 50,
        },
        {
            id: 2,
            icon: "🩺",
            title: "Health Aware",
            description: "Selesaikan kuesioner",
            xp: 150,
        },
        {
            id: 3,
            icon: "📊",
            title: "Progress Check",
            description: "Lakukan cek risiko ulang",
            xp: 200,
        },
        {
            id: 4,
            icon: "📅",
            title: "Planner pro",
            description: "Buat rencana 90 hari",
            xp: 80,
        },
    ];

    const locked = [
    {
        id: 1,
        icon:"🔥",
        title: "3 Days Strong",
        description: "aktif 3 hari berturut-turut",
        xp : 100,
    },
    { 
        id: 2,
        icon:"💪",
        title: "Week Warior",
        description: "aktif 7 hari berturut-turut",
        xp : 400,
    },
    {
        id: 3,
        icon:"🏆",
        title: "Monthly Master",
        description: "aktif 30 hari berturut-turut",
        xp : 800,
    },
    {
        id: 4,
        icon:"✨",
        title: "Makan Sehat",
        description: "Pilihan makanan yang sehat",
        xp : 300,
    },
];

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />

            <div className={`flex-1 transition-all duration-300 ${isOpen ? 'lg:ml-60' : 'lg:ml-24'}`}>
                <HeaderEvaluasiPencapaian
                    title="Pencapaian"
                    subtitle="Pantau intervensi metabolik harianmu"
                />
                <div className="px-8 lg:px-12 py-8 space-y-8">
                    <StatsCard 
                        fromColor="from-[#0A0A0A]" 
                        toColor="to-[#8864D2]" />
                </div>

                <div className="p-6">
                    <h2 className="text-sm font-semibold mb-6">
                        🏆 Diraih <span className="text-green-500">({achievements.length})</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
                        {achievements.map((item) => (
                            <AchivementCard key={item.id} {...item} />
                        ))}
                    </div>

                    <div className="p-6 space-y-6">
                        <h2 className="text-sm font-semibold text-gray-700">
                            Belum Diraih <span className="text-gray-400">({locked.length})</span>
                        </h2>

                        <div className="space-y-4">
                            {locked.map((item) => (
                            <BelumDiraih key={item.id} {...item} />
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}