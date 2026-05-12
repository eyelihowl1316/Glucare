import ProfileItem from "./ProfileItem";
import { FaUser, FaVenusMars, FaCalendar, FaPhone, FaEnvelope } from "react-icons/fa";
import Button from "../components/Button"
import { useNavigate } from "react-router-dom";

export default function ProfileCard() {
    const navigate =useNavigate();

    const data =[ 
        { icon: FaUser, label: "Name", value: "Na Jaemin"},
        { icon: FaVenusMars, label: "Jenis Kelamin", value: "Laki-Laki"},
        { icon: FaCalendar, label: "Tanggal Lahir", value: "13-08-2000"},
        { icon: FaPhone, label: "No Telepon", value: "081345678890"},
        { icon: FaEnvelope, label: "E-mail", value: "Najaemin0813@gmail.com"},
    ];

    return (
        <div className="bg-blue-100 p-5 rounded-xl shadow">
            <h2 className="font-bold mb-4">Profile</h2>

            <div className="space-y-3">
                {data.map((item, index) => (
                    <ProfileItem key={index} {...item} />
                ))}
            </div>

            <div className="flex justify-end mt-6">
            <Button variant="primary" onClick={() => navigate("/editprofile")}>
                Edit Profile
            </Button>  
            </div>         
        </div>
    );
}