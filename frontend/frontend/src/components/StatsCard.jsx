import { motion } from "framer-motion"
export default function StatsCard({
    title,
    value,
    color
}) {
    return (
        <motion.div
            whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 30px rgba(59,130,246,0.6)"
            }}
            transition={{ duration: 0.3 }}
            className="bg-[#27345F] p-8 rounded-3xl shadow-lg"
        >
            <h2 className="text-gray-300 text-xl">
                {title}
            </h2>

            <p
                className={`text-5xl font-bold mt-6 ${color}`}
            >
                {value}
            </p>

        </motion.div>
    )
}