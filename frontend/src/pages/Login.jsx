import { motion } from "framer-motion"
import { loginUser } from "../services/authService"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {

        e.preventDefault()

        try {

            const data = await loginUser({
                email,
                password
            })

            console.log(data)

            alert("Login Successful")

            localStorage.setItem("token", data.token)
            localStorage.setItem("role", data.role)
            localStorage.setItem("email", data.email)
            localStorage.setItem("name", data.name)

            navigate("/dashboard")

        } catch (error) {

            console.log(error)

            alert("Invalid Credentials")
        }
    }

    return (

        <div className="min-h-screen bg-slate-950 flex justify-center items-center">

            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500 opacity-20 blur-[120px] rounded-full animate-pulse"></div>

            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500 opacity-20 blur-[120px] rounded-full animate-pulse"></div>

            <motion.form
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
                onSubmit={handleLogin}
                className="
                relative
                z-10
                backdrop-blur-xl
                bg-white/10
                border border-white/20
                p-10
                rounded-3xl
                w-[400px]
                flex flex-col
                gap-6
                shadow-[0_0_40px_rgba(0,255,255,0.2)]
                "
            >

                <h1 className="text-white text-5xl font-extrabold text-center tracking-wide">
                    MediMind AI
                </h1>

                <p className="text-cyan-300 text-center">
                    Smart Healthcare Assistant
                </p>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
  p-4
  rounded-xl
  bg-white/10
  border border-white/20
  text-white
  placeholder:text-gray-300
  outline-none
  focus:border-cyan-400
  focus:ring-2
  focus:ring-cyan-400
  transition-all
  duration-300
  "
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
p-4
rounded-xl
bg-white/10
border border-white/20
text-white
outline-none
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-400
transition
placeholder:text-gray-300
"
                />

                <button
                    type="submit"
                    className="
bg-gradient-to-r
from-cyan-500
to-blue-600
hover:scale-105
transition-all
duration-300
p-4
rounded-xl
text-white
font-bold
shadow-lg
shadow-cyan-500/40
"
                >
                    Login
                </button>

                <p
  onClick={() => navigate("/forgot-password")}
  className="
  text-cyan-400
  text-center
  cursor-pointer
  hover:text-cyan-300
  transition-all
  duration-300
  "
>
  Forgot Password?
</p>

                <p className="text-gray-400 text-center">

                    Don’t have an account?

                    <span
                        onClick={() => navigate("/register")}
                        className="
text-cyan-400
cursor-pointer
ml-2
hover:text-cyan-300
transition
font-semibold
"
                    >
                        Register
                    </span>

                </p>

            </motion.form>
        </div>
    )
}