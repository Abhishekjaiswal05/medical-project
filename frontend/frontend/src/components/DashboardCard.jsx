export default function DashboardCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">

      <h2 className="text-gray-500">
        {title}
      </h2>

      <p className="text-4xl font-bold mt-4 text-blue-600">
        {value}
      </p>

    </div>
  )
}