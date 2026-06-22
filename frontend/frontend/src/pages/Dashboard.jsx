import api from "../services/api"
import {
    useEffect,
    useState,
    useContext
} from "react"
import {
    getMedicines,
    // addMedicine
} from "../services/medicineService"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { getDashboardData } from "../services/dashboardService"
import { motion } from "framer-motion"
import DashboardLayout from "../layouts/DashboardLayout"

import { searchMedicines }
    from "../services/medicineSearchService"

import AddMedicineModal from "../components/AddMedicineModal"
// import AddMedicineModal from "../components/AddMedicineModal"

import StatsCard from "../components/StatsCard"
import MedicineCard from "../components/MedicineCard"
import AIChatCard from "../components/AIChatCard"
import SOSButton from "../components/SOSButton"
const role = localStorage.getItem("role")
const name = localStorage.getItem("name")
const email = localStorage.getItem("email")

export default function Dashboard() {
    const navigate = useNavigate()

    const handleLogout = () => {

        localStorage.removeItem("token")
        localStorage.removeItem("email")

        navigate("/login")
    }


    useEffect(() => {

        Notification.requestPermission()

    }, [])

    const { user } = useContext(AuthContext)

    // const [stats, setStats] = useState([])

    const [medicines, setMedicines] = useState([])

    // const [stats, setStats] = useState({
    //     total: 0,
    //     taken: 0,
    //     pending: 0
    // })

    const [showModal, setShowModal] =
        useState(false)

    const activeMedicines =
        medicines.filter(
            (m) => m?.taken === false
        ).length

    const completedMedicines =
        medicines.filter(
            (m) => m?.taken === true
        ).length

    const missedDoses =
        medicines.reduce(
            (acc, med) =>
                acc + (med?.missedCount || 0),
            0
        )

    const totalMedicines =
        medicines.length

    const takenMedicines =
        medicines.filter(
            (med) => med?.taken === true
        ).length

    const pendingMedicines =
        medicines.filter(
            (med) => med?.taken === false
        ).length

    const completionRate =
        totalMedicines > 0
            ? Math.round(
                (takenMedicines / totalMedicines) * 100
            )
            : 0;

    const stats = [
        {
            title: "Total Medicines",
            value: totalMedicines,
            color: "blue",
        },

        {
            title: "Taken",
            value: takenMedicines,
            color: "green",
        },

        {
            title: "Pending",
            value: pendingMedicines,
            color: "red",
        },
    ];
    // const [medicines, setMedicines] = useState([])
    const [loading, setLoading] = useState(true)

    const [medicineName, setMedicineName] = useState("")
    // const [dosage, setDosage] = useState("")
    const [dosage, setDosage] = useState("")
    const [timing, setTiming] = useState("")
    const [suggestions, setSuggestions] = useState([])

    const [frequency, setFrequency] = useState("once_daily")

    const [reminderTimes, setReminderTimes] = useState(["08:00"])

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const [totalDays, setTotalDays] = useState(1)

    const [notifications, setNotifications] = useState([])

    const [showNotifications, setShowNotifications] =
        useState(false)

    const fetchDashboard = async () => {

        try {

            const data = await getDashboardData()

            // setStats(data.stats)
            setMedicines(data)

            setLoading(false)

        } catch (error) {

            console.log(error)

            setLoading(false)

        }
    }
    useEffect(() => {

        fetchDashboard()

        fetchMedicines()

    }, [])

    useEffect(() => {

        if (frequency === "once_daily") {
            setReminderTimes(["08:00"])
        }

        if (frequency === "twice_daily") {
            setReminderTimes([
                "08:00",
                "20:00"
            ])
        }

        if (frequency === "thrice_daily") {
            setReminderTimes([
                "08:00",
                "14:00",
                "20:00"
            ])
        }

    }, [frequency])

    const handleMedicineSearch = async (value) => {

        setMedicineName(value)

        if (!value.trim()) {

            setSuggestions([])

            return
        }

        const medicines = await searchMedicines(value)

        setSuggestions(medicines)
    }

    // =========================
    // FETCH MEDICINES
    // =========================

    const fetchMedicines = async () => {

        try {

            const email = localStorage.getItem("email")

            const response =
                await api.get(`/medicine/${email}`)
            console.log("FULL RESPONSE:", response)
            console.log("RESPONSE DATA:", response.data)
            if (Array.isArray(response.data)) {

                setMedicines(response.data)

            } else if (Array.isArray(response.data.data)) {

                setMedicines(response.data.data)

            } else {

                console.log("API Response:", response.data)

                setMedicines([])

            }
        } catch (error) {

            console.log(error)
        }
    }

    useEffect(() => {

        if (Notification.permission !== "granted") {
            Notification.requestPermission()
        }

    }, [])


    useEffect(() => {
        fetchMedicines()
    }, [])

    useEffect(() => {

        const interval = setInterval(() => {

            const now = new Date()

            const currentTime =
                now.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })

            medicines
                .filter((medicine) => medicine)
                .forEach((medicine) => {


                    if (
                        medicine.timing?.slice(0, 5) === currentTime &&
                        !medicine?.taken
                    ) {

                        // Website popup
                        alert(
                            `Time to take ${medicine.medicineName}`
                        )

                        const newNotification = {
                            id: Date.now(),
                            message:
                                `Time to take ${medicine.medicineName}`,
                            time: new Date().toLocaleTimeString(),
                        }

                        setNotifications((prev) => [
                            newNotification,
                            ...prev,
                        ])


                        // Browser notification
                        new Notification(
                            "MediMind AI Reminder",
                            {
                                body:
                                    `Take ${medicine.medicineName}} now`
                            }
                        )



                        // Alarm sound
                        const audio =
                            new Audio("/alarm.mp3")

                        audio.play()
                    }

                })

        }, 30000)

        return () => clearInterval(interval)

    }, [medicines])

    // =========================
    // ADD MEDICINE
    // =========================

    const calculateEndDate = (
        startDate,
        totalDays
    ) => {

        if (!startDate || !totalDays) {
            return ""
        }

        const start = new Date(startDate)

        // invalid date fix
        if (isNaN(start.getTime())) {
            return ""
        }

        start.setDate(
            start.getDate() + Number(totalDays)
        )

        return start
            .toISOString()
            .split("T")[0]
    }

    const handleAddMedicine = async (medicineData) => {

        try {

            const response =
                await api.post(
                    "/medicine",
                    medicineData
                )

            fetchMedicines()

            return response.data

        } catch (error) {

            console.log(error)

        }
    }
    // =========================
    // DELETE MEDICINE
    // =========================

    const deleteMedicine = async (id) => {

        try {

            await api.delete(`/medicine/${id}`)

            // fetchDashboard()

            fetchMedicines()

        } catch (error) {

            console.log(error)
        }
    }

    const markAsTaken = async (id) => {
        try {

            await api.put(`/medicine/${id}/take`)

            fetchMedicines()

            toast.success(
                "Thank you for taking your medicine 💊 Stay healthy!"
            )
        } catch (error) {
            console.log(error)
        }
    }



    if (loading) {
        return (
            <div className="text-white p-10">
                Loading...
            </div>
        )
    }

    return (
        <DashboardLayout>

            {/* <div className="bg-slate-800 text-white p-5 rounded-2xl mb-6">

                <h2 className="text-2xl font-bold">
                    Welcome {name}
                </h2>

                <p className="mt-2">
                    Email: {email}
                </p>

                <p className="mt-2">
                    Role: {role}
                </p>

            </div> */}
            {role === "ADMIN" && (

                <div className="bg-red-500 text-white p-5 rounded-2xl mb-6">

                    <h2 className="text-2xl font-bold">
                        Admin Panel
                    </h2>

                    <p>
                        Manage users, medicines and reports
                    </p>

                </div>

            )}

            {/* {role === "PATIENT" && (

                <div className="bg-blue-500 text-white p-5 rounded-2xl mb-6">

                    <h2 className="text-2xl font-bold">
                        Patient Panel
                    </h2>

                    <p>
                        Track your daily medicines
                    </p>

                </div>

            )} */}

            {role === "CAREGIVER" && (

                <div className="bg-green-500 text-white p-5 rounded-2xl mb-6">

                    <h2 className="text-2xl font-bold">
                        Caregiver Panel
                    </h2>

                    <p>
                        Monitor patient medicines and reminders
                    </p>

                </div>

            )}

            {/* <div className="flex justify-end mb-6">

                <button
                    onClick={() => {
                        localStorage.clear()
                        window.location.href = "/login"
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
                >
                    Logout
                </button>

            </div> */}


            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >

                {/* HEADER */}
                <div className="flex justify-between items-center flex-wrap gap-6">

                    <div>
                        <h1 className="text-5xl font-bold text-white">
                            Good Evening, {name} 👋
                        </h1>

                        <p className="text-gray-400 mt-2 text-lg">
                            Stay on track with your health.
                        </p>
                    </div>

                    <div className="flex items-center gap-6 ml-auto">

                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search medicines..."
                            className="
      bg-[#111827]
      border border-gray-700
      rounded-2xl
      px-6 py-4
      text-white
      outline-none
      w-[340px]
      text-lg
    "
                        />

                        {/* Notification */}
                        <div className="relative">

                            <button
                                onClick={() =>
                                    setShowNotifications(
                                        !showNotifications
                                    )
                                }
                                className="
      bg-[#111827]
      p-4
      rounded-2xl
      text-yellow-400
      text-xl
      relative
    "
                            >

                                🔔

                                {notifications.length > 0 && (

                                    <span
                                        className="
          absolute
          -top-1
          -right-1
          bg-red-500
          text-white
          text-xs
          w-5
          h-5
          rounded-full
          flex
          items-center
          justify-center
        "
                                    >
                                        {notifications.length}
                                    </span>

                                )}

                            </button>



                            {showNotifications && (

                                <div
                                    className="
        absolute
        right-0
        mt-3
        w-80
        bg-[#111827]
        border
        border-gray-700
        rounded-2xl
        shadow-2xl
        z-50
        max-h-96
        overflow-y-auto
      "
                                >

                                    <div className="p-4 border-b border-gray-700 text-white font-bold">
                                        Notifications
                                    </div>

                                    {

                                        notifications.length === 0 ?

                                            (

                                                <div className="p-4 text-gray-400">
                                                    No notifications
                                                </div>

                                            ) :

                                            (

                                                notifications.map((notification) => (

                                                    <div
                                                        key={notification.id}
                                                        className="
                p-4
                border-b
                border-gray-800
                hover:bg-[#1f2937]
              "
                                                    >

                                                        <p className="text-white text-sm">
                                                            {notification.message}
                                                        </p>

                                                        <p className="text-gray-400 text-xs mt-1">
                                                            {notification.time}
                                                        </p>

                                                    </div>

                                                ))

                                            )

                                    }

                                </div>

                            )}

                        </div>

                        {/* Profile */}
                        <div className="relative group">

                            <button
                                className="
        bg-[#111827]
        hover:bg-[#1f2937]
        transition
        p-5
        rounded-2xl
        text-2xl
        text-white
      "
                            >
                                👤
                            </button>

                            <div className="absolute right-0 mt-3 w-72 bg-[#111827] border border-gray-700 rounded-2xl p-5 hidden group-hover:block shadow-2xl z-50">

                                <h2 className="text-white text-xl font-bold">
                                    {name}
                                </h2>

                                <p className="text-gray-400 mt-2">
                                    {email}
                                </p>

                                <p className="text-blue-400 mt-2 font-medium">
                                    Role: {role}
                                </p>

                                <button
                                    onClick={handleLogout}
                                    className="mt-5 w-full bg-red-500 hover:bg-red-600 transition py-3 rounded-xl text-white"
                                >
                                    Logout
                                </button>

                            </div>

                        </div>

                    </div>

                    <button
                        onClick={() => {
                            alert("Emergency Contact Notified 🚨")
                        }}
                        className="bg-red-500 hover:bg-red-600 transition text-white px-8 py-4 rounded-2xl text-xl shadow-lg"
                    >
                        Emergency Alert
                    </button>

                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">

                    {/* Total Medicines */}
                    <div className="bg-[#111827] p-6 rounded-2xl shadow-lg border border-gray-800">
                        <h3 className="text-gray-400 text-sm">
                            Total Medicines
                        </h3>

                        <h1 className="text-4xl font-bold text-white mt-2">
                            {totalMedicines}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Medicines Added
                        </p>
                    </div>

                    {/* Taken */}
                    <div className="bg-green-900/20 p-6 rounded-2xl shadow-lg border border-green-800">
                        <h3 className="text-green-300 text-sm">
                            Taken
                        </h3>

                        <h1 className="text-4xl font-bold text-white mt-2">
                            {takenMedicines}
                        </h1>

                        <p className="text-green-400 mt-2">
                            {completionRate}% Completed
                        </p>
                    </div>

                    {/* Pending */}
                    <div className="bg-red-900/20 p-6 rounded-2xl shadow-lg border border-red-800">
                        <h3 className="text-red-300 text-sm">
                            Pending
                        </h3>

                        <h1 className="text-4xl font-bold text-white mt-2">
                            {pendingMedicines}
                        </h1>

                        <p className="text-red-400 mt-2">
                            Need Attention
                        </p>
                    </div>

                </div>

                {/* MEDICINE SECTION */}
                <div className="bg-white rounded-[40px] p-10 mt-14">

                    <div className="flex justify-between items-center flex-wrap gap-4">

                        <h2 className="text-4xl font-bold text-[#111827]">
                            Today's Medicines
                        </h2>

                        <button
                            onClick={() => setShowModal(true)}
                            className="
    bg-blue-600
    text-white
    px-8
    py-4
    rounded-2xl
    text-xl
  "
                        >
                            + Add Medicine
                        </button>

                    </div>

                    <div className="mt-10 flex flex-col gap-6">

                        {
                            medicines.length > 0 ? (

                                medicines
                                    .filter((item) => item)
                                    .map((medicine) => (

                                        <MedicineCard
                                            key={medicine._id || medicine.id}
                                            medicine={medicine}
                                            onDelete={() =>
                                                deleteMedicine(
                                                    medicine._id || medicine.id
                                                )
                                            }
                                            onTaken={() =>
                                                markAsTaken(
                                                    medicine._id || medicine.id
                                                )
                                            }
                                        />
                                    ))

                            ) : (

                                <div className="text-center py-16 text-gray-400 text-xl">

                                    No medicines added yet 💊

                                </div>
                            )
                        }
                    </div>


                </div>

                {/* AI CHATBOT */}
                <AIChatCard />

                {/* SOS BUTTON */}
                <SOSButton />

                {showModal && (
                    <AddMedicineModal
                        isOpen={showModal}

                        onClose={() =>
                            setShowModal(false)
                        }

                        onAdd={async (medicineData) => {

                            try {

                                await handleAddMedicine(medicineData)

                                await fetchMedicines()

                                setShowModal(false)

                            } catch (error) {

                                console.error(
                                    "Error adding medicine:",
                                    error
                                )
                            }
                        }}
                    />
                )}
            </motion.div>

        </DashboardLayout>



    )

}