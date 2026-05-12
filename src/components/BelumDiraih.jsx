export default function BelumDiraih ({
    icon = "🔥", title,description,xp,
}) {
    return (
        <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
                <div className="text-xl opacity-70">{icon}</div>

                <div>
                    <p className="text-sm font-medium text-gray-700">{title}</p>
                    <p className="text-xs text-gray-500">{description}</p>
                </div>
            </div>

            {xp && (
                <p className="text-xs text-gray-400">+ {xp} XP</p>
            )}
        </div>
    );
}