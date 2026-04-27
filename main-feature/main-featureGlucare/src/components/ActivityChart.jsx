export default function ActivityChart() {
    const data = [40, 70, 30, 90, 60, 85, 35];
    const days = ['Sen','Sel','Rab','Kam','Jum','Sab','Min'];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Aktivitas 7 Hari Terakhir
            </h3>

            <div className="flex items-end justify-between h-40 px-2">
                {data.map((val, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <div className="h-28 flex items-end">
                            <div
                                className="w-6 rounded-lg bg-gradient-to-b from-blue-400 to-blue-600 hover:scale-105 transition"
                                style={{ height: `${val}%` }}
                            />
                        </div>

                        <span className="text-xs text-gray-500">
                            {days[i]}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex justify-between text-xs text-gray-400 mt-3">
                <span>rendah</span>
                <span className="text-blue-500 font-medium">
                    menit aktif/hari
                </span>
                <span>tinggi</span>
            </div>
        </div>
    );
}