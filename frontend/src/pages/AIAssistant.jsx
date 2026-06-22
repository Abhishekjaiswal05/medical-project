import api from "../services/api"
import DashboardLayout from "../layouts/DashboardLayout"
import { useState, useRef, useEffect} from "react"
export default function AIAssistant() {

    const handleQuickAction = (text) => {
    setMessage(text)
}
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "Hello 👋  I'm MediMind AI. How can I help you today?"
        }
    ])

    const handleSend = async () => {

        if (!message.trim()) return

        const userMessage = message

        setMessages(prev => [
            ...prev,
            {
                sender: "user",
                text: userMessage
            }
        ])

        setMessage("")

        try {

            const response = await api.post(
                "/ai/chat",
                {
                    message: userMessage
                }
            )

            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    text: response.data
                }
            ])

        } catch (error) {

            console.log(error)

            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    text: "❌ AI Service Error"
                }
            ])
        }
    }

        const messagesEndRef = useRef(null)

        useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
        behavior: "smooth"
    })
}, [messages])
    
    return (

        <DashboardLayout>

            <div className="absolute top-10 left-20 w-72 h-72 bg-cyan-500/10 blur-[120px] pointer-events-none" />

            <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 blur-[120px] pointer-events-none" />

            <div className="grid lg:grid-cols-[320px_1fr] gap-8">

                {/* LEFT PANEL */}


                <div className="
lg:col-span-3
bg-[#111827]
rounded-3xl
p-8
h-[85vh]
flex
flex-col
">

                    <h1 className="text-4xl font-bold text-white text-center">

                        ✨ Ask Anything About Medicines

                    </h1>

                    <p className="text-center text-gray-400 mt-4">

                        Get instant answers about medicines,
                        dosage and side effects.

                    </p>

                    {/* CHAT AREA */}

                    <div className="flex-1 overflow-y-auto mt-8 space-y-6 pr-2">

                        {
                            messages.map((msg, index) => (

                                <div
                                    key={index}
                                    className={
                                        msg.sender === "ai"
                                            ? "flex justify-start"
                                            : "flex justify-end"
                                    }
                                >

                                    <div
                                        className={
                                            msg.sender === "ai"
                                                ? "bg-slate-800 border border-cyan-500/20 text-white p-5 rounded-2xl max-w-[70%]"
                                                : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-5 rounded-2xl max-w-[70%]"
                                        }
                                    >

                                        <>
{
    msg.sender === "ai" && (
        <p className="text-cyan-400 text-sm mb-2">
            🤖 MediMind AI
        </p>
    )
}

<p>{msg.text}</p>
</>

                                    </div>

                                </div>

                            ))
                        }
                        <div ref={messagesEndRef}></div>

                    </div>

                    {/* INPUT */}

                    <div className="border-t border-gray-700 pt-4 flex gap-4">

                        <input
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSend()
                                }
                            }}
                            placeholder="Ask anything..."
                            className="
                flex-1
                bg-[#1B2448]
                text-white
                px-6
                py-4
                rounded-2xl
                outline-none
            "
                        />

                        <button
                            onClick={handleSend}
                            className="
                bg-blue-600
                hover:bg-blue-700
                px-8
                rounded-2xl
                text-white
            "
                        >
                            Send
                        </button>

                    </div>

                </div>
            </div>

        </DashboardLayout>

    )
}
