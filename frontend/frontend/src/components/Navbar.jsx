export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6 shadow-sm bg-white">

      <h1 className="text-3xl font-bold text-blue-600">
        MediMind AI
      </h1>

      <div className="space-x-6">

        <button className="hover:text-blue-600">
          Features
        </button>

        <button className="hover:text-blue-600">
          About
        </button>

      </div>

    </nav>
  )
}