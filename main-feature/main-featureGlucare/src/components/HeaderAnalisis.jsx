function HeaderAnalisis({title, subtitle}) {
    return (
        <div className="w-full bg-gradient-to-r from-[#0072CE] to-[#3E97FF] text-white p-8">

            <div className="absolute w-40 h-40g bg-white/10 rounded-full top-[-20px] right-8"></div>
            <div className="absolute w-28 h-28 bg-white/10 rounded-full top-10px right-80"></div>

            <h1 className="text-xl md;text-2xl font-bold">
                {title}
            </h1>

            {subtitle && (
                <p className="text-sm mt-1 opacity-90">
                    {subtitle}
                </p>
            )}

        </div>
    );
}

export default HeaderAnalisis;