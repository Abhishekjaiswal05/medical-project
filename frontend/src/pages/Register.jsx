import { motion } from "framer-motion"
import { registerUser } from "../services/authService"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register() {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("PATIENT")

    const handleRegister = async (e) => {

        e.preventDefault()

        try {

            const data = await registerUser({
                name,
                email,
                password,
                role
            })

            alert("Registration Successful")

            navigate("/login")

        } catch (error) {

            console.log(error)

            alert("Registration Failed")
        }
    }

    return (

        <div className="min-h-screen bg-slate-950 flex justify-center items-center overflow-hidden relative">

            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500 opacity-20 blur-[120px] rounded-full"></div>

            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500 opacity-20 blur-[120px] rounded-full"></div>

            <motion.form
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
                onSubmit={handleRegister}
                className="
  relative
  z-10
  backdrop-blur-xl
  bg-white/10
  border border-white/20
  p-10
  rounded-3xl
  w-[420px]
  flex flex-col
  gap-5
  shadow-[0_0_40px_rgba(0,255,255,0.2)]
  "
            >

                

                <h1 className="text-white text-5xl font-extrabold text-center tracking-wide">
                    Create Account
                </h1>

                <p className="text-cyan-300 text-center">
                    Join MediMind AI Healthcare
                </p>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                   placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-[#1E293B] text-white mt-4"
                >
                    <option value="PATIENT">Patient</option>
                    <option value="CAREGIVER">Caregiver</option>
                    <option value="ADMIN">Admin</option>
                </select>

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
                    Register
                </button>

                <p className="text-gray-400 text-center">
  Already have an account?

  <span
    onClick={() => navigate("/login")}
    className="
    text-cyan-400
    cursor-pointer
    ml-2
    hover:text-cyan-300
    transition
    font-semibold
    "
  >
    Login
  </span>
</p>

            </motion.form>

        </div>
    )
}