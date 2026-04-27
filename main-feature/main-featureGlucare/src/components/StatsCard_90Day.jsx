export default function StatsCards_90Day() {
    const stats = [
    { id:1, icon:"🔥", value:"1 hari", label:"Streak" },
    { id:2, icon:"⚡", value:"8", label:"Level" },
    { id:3, icon:"🏅", value:"4", label:"Pencapaian" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map(item => (
                <div
                    key={item.id}
                    className="bg-gradient-to-br from-[#0072CE] to-[#003A68] text-white rounded-2xl p-5 shadow-sm"
                >
                    <div className="text-xl">{item.icon}</div>
                    <p className="text-xl font-bold mt-2">{item.value}</p>
                    <p className="text-xs opacity-80">{item.label}</p>
                </div>
            ))}
        </div>
    );
}