import Sidebar from "../components/Sidebar";
import HeaderAnalisis from "../components/HeaderAnalisis";
import { UseState } from 'react';

function Analisis() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex-1">
                <HeaderAnalisis title="Analisis Risiko" subtitle="Pilih metode untuk menghitung skor risiko"
                />

                <div className="p-6"></div>

            </div>
        </div>      
    );
}

export default Analisis;