import { motion } from "framer-motion"
export default function Sidebar() {

    const menuItems = [
        "Dashboard",
        "Medicine Tracker",
        "AI Assistant",
        "Emergency Alerts"
    ]

    return (
        <div className="w-full md:w-72 bg-[#1B2448] text-white p-6">

            <h1 className="text-4xl font-bold text-cyan-400">
                MediMind AI
            </h1>

            <div className="mt-16 flex flex-col gap-6">

                {
                    menuItems.map((item) => (
                        <motion.button
                            whileHover={{
                                x: 10,
                                backgroundColor: "#2563EB"
                            }}
                            whileTap={{
                                scale: 0.95
                            }}
                            key={item}
                            className="text-left px-5 py-4 rounded-2xl hover:bg-blue-500 transition"
                        >
                            {item}
                        </motion.button>
                    ))
                }

            </div>

        </div>
    )
}