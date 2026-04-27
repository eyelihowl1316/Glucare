import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoadingAnalisis() {
    const navigate = useNavigate();

    useEffect(() => {
    const timer = setTimeout(() => {
        navigate("/hasil");
        }, 5000);

    return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%.rgba(120,119,198,0.1),transparent),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1),transparent)]" />
            <div className="relative z-10 flex flex-col items-center justify-center p-8">
                <div className="relative w-32 h-32 mb-8">
                    <div className="absolute inset-0 w-32 h-32 border-4 border-[#0072CE] rounded-full animated-ping [animation-duration:2s]"></div>
                    <div className="w-24 h-24 border-4 border-gray-100 border-t-gradient-to-r from-[#0072CE] via-[#00A3E0] to-[#40C4FF] rounded-full animated-spin [animation-duration:1.2s]"></div>
                    <div className="absolute inset-4 w-16 h-16 bg-gradient-to-r from-[#0072CE]/20 to-[#40C4FF]/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute inset-8 w-8 h-8 bg-gradient-to-r from-[#0072ce] to-[#40c4ff] rounded-full shadow-lg"></div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#0072CE] via-[#00A3E0] to-[#40C4FF] bg-clip-text text-transparent mb-2">
                    Menganalisis data Anda
                </h2>

                <p className="text-sm sm:text-base text-gray-600 font-medium tracking-wide animate-pulse [animation-duration:2s]">
                    Mohon tinggu beberapa saat...
                </p>

                <div className="absolute -top-10 -right-10 w-4 h-4 bg-[#0072ce]/30 rounded-full animate-bounce [animation-delay:-0.5s]"></div>
                <div className="absolute -bottom-10 left-20 w-3 h-3 bg-[#40c4ff]/20 rounded-full animate-bounce [animstion-delay:-02.s]"></div>
                <div className="absolute top-20 -left-10 w-2 h-2 bg-[#00a3e0]/30 rounded-full animate-bounce [animation-delay:-1s]"></div>
            </div>
        </div>   
    );
}
