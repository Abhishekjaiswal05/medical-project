import axios from "axios"
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"

export default function AIChatCard() {

    const messagesContainerRef = useRef(null)

    const [message, setMessage] = useState("")
    const [isTyping, setIsTyping] = useState(false)

    // DARK MODE STATE
    const [darkMode, setDarkMode] = useState(true)

    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "ai",
            text: "Hello 👋 I analyzed today's medication schedule. Don't forget your blood pressure tablet after breakfast."
        }
    ])

    const handleSendMessage = async () => {

        if (!message.trim()) return

        const userMessage = {
            id: Date.now(),
            sender: "user",
            text: message
        }

        setMessages((prev) => [...prev, userMessage])

        const userText = message

        setMessage("")

        setIsTyping(true)

        try {

            const response = await axios.post(
                "http://localhost:8080/api/ai/chat",
                {
                    message: userText
                }
            )

            const aiMessage = {
                id: Date.now() + 1,
                sender: "ai",
                text: response.data
            }

            setMessages((prev) => [...prev, aiMessage])

        } catch (error) {

            console.log(error)

            const errorMessage = {
                id: Date.now() + 2,
                sender: "ai",
                text: "AI service unavailable."
            }

            setMessages((prev) => [...prev, errorMessage])
        }

        setIsTyping(false)
    }

    useEffect(() => {

        const container = messagesContainerRef.current

        if (container) {

            container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth"
            })

        }

    }, [messages, isTyping])

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 40,
                scale: 0.95
            }}

            animate={{
                opacity: 1,
                y: 0,
                scale: 1
            }}

            transition={{
                duration: 0.6
            }}

            className={`
                backdrop-blur-xl
                rounded-3xl
                p-8
                mt-10
                border
                transition-all
                duration-500
                ${
                    darkMode
                        ? `
                            bg-[#27345F]/80
                            border-cyan-400/20
                            shadow-[0_0_40px_rgba(34,211,238,0.15)]
                        `
                        : `
                            bg-white/90
                            border-gray-300
                            shadow-[0_0_30px_rgba(0,0,0,0.1)]
                        `
                }
            `}
        >

            {/* TOP BAR */}
            <div className="flex justify-end mb-5">

                <button

                    onClick={() => setDarkMode(!darkMode)}

                    className={`
                        px-5
                        py-2
                        rounded-xl
                        font-semibold
                        transition-all
                        duration-300
                        ${
                            darkMode
                                ? "bg-white text-black"
                                : "bg-black text-white"
                        }
                    `}
                >

                    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}

                </button>

            </div>

            {/* Header */}
            <div className="flex items-center gap-5 relative">

                {/* AI ORB */}
                <motion.div

                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                    }}

                    transition={{
                        duration: 4,
                        repeat: Infinity
                    }}

                    className="
                        relative
                        w-20
                        h-20
                        rounded-full
                        bg-gradient-to-r
                        from-cyan-400
                        via-blue-500
                        to-purple-500
                        shadow-[0_0_60px_rgba(34,211,238,0.8)]
                        flex
                        items-center
                        justify-center
                    "
                >

                    {/* INNER GLOW */}
                    <div
                        className="
                            absolute
                            w-10
                            h-10
                            rounded-full
                            bg-white/40
                            blur-xl
                        "
                    ></div>

                    {/* CENTER DOT */}
                    <div
                        className="
                            w-5
                            h-5
                            rounded-full
                            bg-white
                        "
                    ></div>

                </motion.div>

                {/* TEXT */}
                <div>

                    <h2
                        className={`
                            text-4xl
                            font-bold
                            ${
                                darkMode
                                    ? "text-white"
                                    : "text-black"
                            }
                        `}
                    >
                        MediMind AI Assistant
                    </h2>

                    <p
                        className={`
                            mt-1
                            ${
                                darkMode
                                    ? "text-cyan-300"
                                    : "text-blue-700"
                            }
                        `}
                    >
                        Online • Smart Healthcare Support
                    </p>

                </div>

            </div>

            {/* Messages */}
            <div

                ref={messagesContainerRef}

                className="
                    mt-8
                    flex
                    flex-col
                    gap-4
                    max-h-[400px]
                    overflow-y-auto
                    pr-2
                    scroll-smooth
                "
            >

                {
                    messages.map((msg) => (

                        <motion.div

                            key={msg.id}

                            initial={{
                                opacity: 0,
                                y: 20
                            }}

                            animate={{
                                opacity: 1,
                                y: 0
                            }}

                            transition={{
                                duration: 0.3
                            }}

                            className={`
                                max-w-[80%]
                                px-6
                                py-4
                                rounded-2xl
                                backdrop-blur-lg
border border-white/10
                                text-lg
                                ${
                                    msg.sender === "ai"
                                        ? darkMode
                                            ? "bg-[#1F5F8B] text-white"
                                            : "bg-blue-100 text-black"
                                        : "bg-blue-600 text-white self-end"
                                }
                            `}
                        >

                            {msg.text}

                        </motion.div>

                    ))
                }

                {
                    isTyping && (

                        <motion.div

                            initial={{
                                opacity: 0
                            }}

                            animate={{
                                opacity: 1
                            }}

                            className={`
                                w-fit
                                px-5
                                py-3
                                rounded-2xl
                                backdrop-blur-lg
border border-white/10
                                flex
                                items-center
                                gap-2
                                ${
                                    darkMode
                                        ? "bg-[#1F5F8B]"
                                        : "bg-blue-100"
                                }
                            `}
                        >

                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>

                            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>

                            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>

                        </motion.div>
                    )
                }

            </div>

            {/* Input */}
            <div className="flex gap-4 mt-8">

                <input

                    type="text"

                    placeholder="Write a message..."

                    value={message}

                    onChange={(e) => setMessage(e.target.value)}

                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSendMessage()
                        }
                    }}

                    className={`
                        flex-1
                        px-6
                        py-4
                        rounded-2xl
                        backdrop-blur-lg
border border-white/10
                        outline-none
                        border
                        transition-all
                        duration-300
                        ${
                            darkMode
                                ? `
                                    bg-[#1B2448]
                                    text-white
                                    border-cyan-400/20
                                    focus:border-cyan-400
                                    focus:shadow-[0_0_20px_rgba(34,211,238,0.5)]
                                `
                                : `
                                    bg-white
                                    text-black
                                    border-gray-300
                                    focus:border-blue-500
                                `
                        }
                    `}
                />

                <motion.button

                    whileHover={{
                        scale: 1.08,
                        boxShadow: "0px 0px 20px rgba(34,211,238,0.8)"
                    }}

                    whileTap={{
                        scale: 0.95
                    }}

                    onClick={handleSendMessage}

                    className="
                        bg-gradient-to-r
                        from-cyan-400
                        to-blue-600
                        hover:from-cyan-300
                        hover:to-blue-500
                        shadow-[0_0_20px_rgba(34,211,238,0.4)]
                        transition
                        text-white
                        px-8
                        rounded-2xl
                        backdrop-blur-lg
border border-white/10
                        text-lg
                        font-semibold
                    "
                >
                    Send
                </motion.button>

            </div>

        </motion.div>
    )
}