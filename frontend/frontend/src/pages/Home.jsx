import { useNavigate } from "react-router-dom"

export default function Home() {

    const navigate = useNavigate()

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-slate-950 text-white">

            <h1 className="text-6xl font-bold mb-10">
                MediMind AI
            </h1>

            <div className="flex gap-6">

                <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-600 px-8 py-4 rounded-xl"
                >
                    Login
                </button>

                <button
                    onClick={() => navigate("/register")}
                    className="bg-green-600 px-8 py-4 rounded-xl"
                >
                    Register
                </button>

            </div>

        </div>
    )
}