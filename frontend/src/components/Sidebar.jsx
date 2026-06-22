import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: "🏠"
        },
        {
            name: "Medicine Tracker",
            path: "/medicine-tracker",
            icon: "💊"
        },
        {
            name: "Prescription Upload",
            path: "/prescription-upload",
            icon: "📄"
        },
        {
            name: "AI Assistant",
            path: "/ai-assistant",
            icon: "🤖"
        },
        {
            name: "Emergency Alerts",
            path: "/emergency-alerts",
            icon: "🚨"
        }
    ];

    return (
        <div className="w-72 bg-[#111827] text-white p-6 min-h-screen border-r border-gray-800">

            <h1 className="text-4xl font-bold text-cyan-400">
                MediMind AI
            </h1>

            <p className="text-gray-400 mt-2">
                Smart Healthcare Assistant
            </p>

            <div className="mt-12 flex flex-col gap-3">

                {menuItems.map((item) => {

                    const active =
                        location.pathname === item.path;

                    return (
                        <motion.button
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                                flex items-center gap-3
                                px-5 py-4
                                rounded-2xl
                                transition-all
                                ${active
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "hover:bg-[#1f2937]"
                                }
                            `}
                        >
                            <span>
                                {item.icon}
                            </span>

                            <span>
                                {item.name}
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            <div className="mt-16 p-4 rounded-2xl bg-[#1f2937]">

                <h3 className="font-bold text-cyan-400">
                    Health Tip
                </h3>

                <p className="text-sm text-gray-300 mt-2">
                    Take medicines on time and
                    drink enough water daily.
                </p>

            </div>

        </div>
    );
}