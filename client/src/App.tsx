import { Route, BrowserRouter as Router, Routes, Navigate, useLocation } from "react-router-dom"
import GitHubCorner from "./components/GitHubCorner"
import Toast from "./components/toast/Toast"
import EditorPage from "./pages/EditorPage"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import VerifyEmailPage from "./pages/VerifyEmailPage"

function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null
  const location = useLocation()
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/editor" element={<PrivateRoute><EditorPage /></PrivateRoute>} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/verify-email" element={<VerifyEmailPage />} />
                </Routes>
            </Router>
            <Toast /> {/* Toast component from react-hot-toast */}
            <GitHubCorner />
        </>
    )
}

export default App
