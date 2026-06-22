import api from "../services/api"
import toast from "react-hot-toast"

import AddMedicineModal
    from "../components/AddMedicineModal"

import MedicineCard
    from "../components/MedicineCard"
import {
    useState,
    useEffect
}
from "react"
import DashboardLayout from "../layouts/DashboardLayout"

export default function MedicineTracker() {

    const [showModal, setShowModal] =
        useState(false)
    const [medicines, setMedicines] = useState([])
    const [loading, setLoading] = useState(true)
    // const [medicineName, setMedicineName] = useState("")
    // const [dosage, setDosage] = useState("")
    // const [timing, setTiming] = useState("")
    // const [suggestions, setSuggestions] = useState([])

    // const [frequency, setFrequency] = useState("once_daily")

    // const [reminderTimes, setReminderTimes] = useState(["08:00"])

    // const [startDate, setStartDate] = useState("")
    // const [endDate, setEndDate] = useState("")

    // const [totalDays, setTotalDays] = useState(1)


    //   useEffect(() => {
    
    //         if (frequency === "once_daily") {
    //             setReminderTimes(["08:00"])
    //         }
    
    //         if (frequency === "twice_daily") {
    //             setReminderTimes([
    //                 "08:00",
    //                 "20:00"
    //             ])
    //         }
    
    //         if (frequency === "thrice_daily") {
    //             setReminderTimes([
    //                 "08:00",
    //                 "14:00",
    //                 "20:00"
    //             ])
    //         }
    
    //     }, [frequency])
    const fetchMedicines = async () => {
    try {

        const email =
            localStorage.getItem("email")

        const response =
            await api.get(`/medicine/${email}`)

        if (Array.isArray(response.data)) {
            setMedicines(response.data)
        } else {
            setMedicines([])
        }

        setLoading(false)

    } catch (error) {

        console.log(error)

        setLoading(false)
    }
}

useEffect(() => {
    fetchMedicines();
}, []);

    // =========================
    // ADD MEDICINE
    // =========================
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

        <div className="bg-white rounded-[40px] p-10">

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
                    "
                >
                    + Add Medicine
                </button>

            </div>

            <div className="mt-10 flex flex-col gap-6">

                {
                    medicines.length > 0 ? (

                        medicines.map((medicine) => (

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

                        console.error(error)

                    }
                }}
            />
        )}

    </DashboardLayout>
)
}