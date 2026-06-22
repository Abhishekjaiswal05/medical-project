import { motion } from "framer-motion"
export default function SOSButton() {
    return (
        <motion.button
            animate={{
                scale: [1, 1.1, 1]
            }}
            transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY
            }}
            className="
fixed
bottom-6
right-6
md:bottom-10
md:right-10
z-50
bg-red-500
hover:bg-red-600
text-white
px-7
py-4
rounded-full
text-xl
font-bold
shadow-[0_0_30px_#ef4444]
transition
"
        >
            🚨 SOS
        </motion.button>
    )
}