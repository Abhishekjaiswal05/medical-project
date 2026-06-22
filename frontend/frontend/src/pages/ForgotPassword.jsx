import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import toast from "react-hot-toast"

export default function ForgotPassword() {

  const [email, setEmail] = useState("")

  const navigate = useNavigate()

  const handleForgotPassword = async (e) => {

    e.preventDefault()

    try {

      await api.post("/auth/forgot-password", {
        email
      })

      toast.success(
        "Password reset link sent to your email 📧"
      )

    } catch (error) {

      toast.error(
        "Email not found"
      )

    }

  }

  return (

    <div className="min-h-screen bg-slate-950 flex justify-center items-center overflow-hidden relative">

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500 opacity-20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500 opacity-20 blur-[120px] rounded-full"></div>

      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleForgotPassword}
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
        gap-5
        "
      >

        <h1 className="text-white text-4xl font-bold text-center">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter registered email"
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
          "
        />

        <button
          type="submit"
          className="
          bg-gradient-to-r
          from-cyan-500
          to-blue-600
          p-4
          rounded-xl
          text-white
          font-bold
          "
        >
          Send Reset Link
        </button>

      </motion.form>

    </div>
  )
}