import { useState } from "react"

export default function AddMedicineModal({
  isOpen,
  onClose,
  onAdd
}) {
  const [name, setName] = useState("")
  const [dosage, setDosage] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [notes, setNotes] = useState("")

  const [frequency, setFrequency] =
    useState("Once daily")

  const [reminderTimes, setReminderTimes] =
    useState(["08:00"])

  if (!isOpen) return null

  const handleSubmit = () => {
    const medicineData = {
      medicineName: name,
      dosage,
      timing: reminderTimes[0],
      frequency,
      taken: false,
      missedCount: 0,
      userEmail: localStorage.getItem("email")
    }

    onAdd(medicineData)

    setName("")
    setDosage("")
    setStartDate("")
    setEndDate("")
    setNotes("")
    setFrequency("Once daily")
    setReminderTimes(["08:00"])

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[700px] rounded-3xl p-7 relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-2xl"
        >
          ×
        </button>

        {/* TITLE */}
        <h2 className="text-4xl font-bold mb-8">
          Add medication
        </h2>

        {/* NAME + DOSAGE */}
        <div className="grid grid-cols-2 gap-4 mb-5">

          <div>
            <label className="font-semibold block mb-2">
              Name
            </label>

            <input
              type="text"
              placeholder="Medicine Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border rounded-xl p-4 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Dosage
            </label>

            <input
              type="text"
              placeholder="10mg"
              value={dosage}
              onChange={(e) =>
                setDosage(e.target.value)
              }
              className="w-full border rounded-xl p-4 outline-none"
            />
          </div>
        </div>

        {/* FREQUENCY */}
        <div className="mb-5">

          <h3 className="font-semibold mb-3">
            Frequency
          </h3>

          <div className="grid grid-cols-2 gap-3">

            {/* ONCE DAILY */}
            <button
              type="button"
              onClick={() => {
                setFrequency("Once daily")

                setReminderTimes([
                  "08:00"
                ])
              }}
              className={`p-4 rounded-xl border font-semibold ${frequency === "Once daily"
                  ? "bg-green-800 text-white"
                  : "bg-white"
                }`}
            >
              Once daily
            </button>

            {/* TWICE DAILY */}
            <button
              type="button"
              onClick={() => {
                setFrequency("Twice daily")

                setReminderTimes([
                  "08:00",
                  "20:00"
                ])
              }}
              className={`p-4 rounded-xl border font-semibold ${frequency === "Twice daily"
                  ? "bg-green-800 text-white"
                  : "bg-white"
                }`}
            >
              Twice daily
            </button>

            {/* THREE TIMES */}
            <button
              type="button"
              onClick={() => {
                setFrequency("Three times")

                setReminderTimes([
                  "08:00",
                  "14:00",
                  "20:00"
                ])
              }}
              className={`p-4 rounded-xl border font-semibold ${frequency === "Three times"
                  ? "bg-green-800 text-white"
                  : "bg-white"
                }`}
            >
              Three times
            </button>

            {/* CUSTOM */}
            <button
              type="button"
              onClick={() => {
                setFrequency("Custom")

                setReminderTimes([
                  "08:00"
                ])
              }}
              className={`p-4 rounded-xl border font-semibold ${frequency === "Custom"
                  ? "bg-green-800 text-white"
                  : "bg-white"
                }`}
            >
              Custom
            </button>

          </div>
        </div>

        {/* REMINDER TIMES */}
        <div className="mb-5">

          <h3 className="font-semibold mb-3">
            Reminder times
          </h3>

          <div className="space-y-3">

            {reminderTimes.map(
              (time, index) => (
                <input
                  key={index}
                  type="time"
                  value={time}
                  onChange={(e) => {
                    const updated = [
                      ...reminderTimes
                    ]

                    updated[index] =
                      e.target.value

                    setReminderTimes(
                      updated
                    )
                  }}
                  className="w-full border rounded-xl p-4 outline-none"
                />
              )
            )}

          </div>
        </div>

        {/* START + END DATE */}
        <div className="grid grid-cols-2 gap-4 mb-5">

          <div>
            <label className="font-semibold block mb-2">
              Start date
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(e.target.value)
              }
              className="w-full border rounded-xl p-4 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              End date (optional)
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                setEndDate(e.target.value)
              }
              className="w-full border rounded-xl p-4 outline-none"
            />
          </div>

        </div>

        {/* NOTES */}
        <div className="mb-6">

          <label className="font-semibold block mb-2">
            Notes
          </label>

          <textarea
            rows={4}
            placeholder="Notes"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            className="w-full border rounded-xl p-4 outline-none"
          />

        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="px-6 py-3 border rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-800 text-white px-6 py-3 rounded-xl"
          >
            Add medication
          </button>

        </div>

      </div>
    </div>
  )
}