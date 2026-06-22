export default function MedicineCard({
  medicine,
  onDelete,
  onTaken
}) {

  return (

    <div className="flex justify-between items-center border border-gray-200 rounded-2xl px-6 py-6 mb-4 bg-white shadow-sm">

      {/* LEFT SIDE */}
      <div>

        <h2 className="text-xl font-semibold text-gray-800">
          {medicine?.medicineName}
        </h2>

        <p className="text-gray-500 mt-2">
          Dosage: {medicine?.dosage}
        </p>

        <p className="text-sm text-gray-400 mt-1">
          Timing: {medicine?.timing}
        </p>

        <p
          className={`mt-2 font-medium ${
            medicine?.taken
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {medicine?.taken ? "✅ Taken" : "❌ Pending"}
        </p>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex gap-3">

        <button
          onClick={onTaken}
          className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white transition"
        >
          Taken
        </button>

        <button
          onClick={onDelete}
          className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
        >
          Delete
        </button>

      </div>

    </div>

  );
}