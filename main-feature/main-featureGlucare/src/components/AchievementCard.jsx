export default function AchivementCard ({
    icon, title, description, xp
}) {
    return (
        <div className="bg-blue-50 rounded-2xl p-6 w-full max-w-sm min-h-[160px] flex flex-col items-center justify-center text-center shadow-sm">
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="text-sm font-semibold text-blue-600">
                {title}
            </h3>

            <p className="text-xs text-gray-500 mt-1">
                {description}
            </p>

            <div className="mt-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full inline-block"> +{xp} XP                
            </div>
        </div>
    );
}