import { useNavigate, Link } from "react-router-dom"
import { useCallback } from "react"

const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#38bdf8"/>
    <path d="M12 28L20 12L28 28" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 28L20 20L24 28" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function HomePage() {
  const navigate = useNavigate()

  const handleProtectedNav = useCallback(() => {
    const jwt = localStorage.getItem("token")
    if (!jwt) {
      navigate("/login")
    } else {
      navigate("/editor")
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101624] to-[#181f2e] text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-2xl font-bold tracking-tight text-white select-none">CodeTogether</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-lg">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/login" className="hover:text-primary transition-colors">Login</Link>
        </nav>
        {/* Mobile nav can be added here if needed */}
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4">Struggling to collaborate with your friends?</h1>
        <p className="text-xl md:text-2xl text-center text-blue-200 mb-12">Try out our Collaborative Code Editor!</p>
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-xl justify-center">
          <button
            onClick={handleProtectedNav}
            className="flex-1 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-semibold text-lg py-4 shadow-lg transition-colors"
          >
            Collaborative Editor
          </button>
          <button
            onClick={handleProtectedNav}
            className="flex-1 rounded-full bg-[#232b3b] hover:bg-[#2d3650] text-white font-semibold text-lg py-4 shadow-lg transition-colors"
          >
            AI Study Planner
          </button>
        </div>
      </main>
    </div>
  )
}

export default HomePage
