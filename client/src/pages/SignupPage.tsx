import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { IoCodeSlash, IoEye, IoEyeOff, IoMail, IoLockClosed, IoPerson } from "react-icons/io5"
import { LuGithub, LuCheck } from "react-icons/lu"
import { toast } from "react-hot-toast"

const SignupPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const validatePassword = (password: string) => {
        const minLength = password.length >= 8
        const hasUpperCase = /[A-Z]/.test(password)
        const hasLowerCase = /[a-z]/.test(password)
        const hasNumbers = /\d/.test(password)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
        
        return { minLength, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar }
    }

    const passwordValidation = validatePassword(formData.password)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!agreedToTerms) {
            toast.error("Please agree to the terms and conditions")
            return
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        const validation = validatePassword(formData.password)
        if (!Object.values(validation).every(Boolean)) {
            toast.error("Password does not meet requirements")
            return
        }

        setIsLoading(true)
        
        // Simulate signup process
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        toast.success("Account created successfully! Welcome to Code-Sync.")
        navigate("/verify-email")
        setIsLoading(false)
    }

    const handleSocialSignup = (provider: string) => {
        toast.info(`${provider} signup coming soon!`)
    }

    return (
        <div className="min-h-screen bg-dark text-white">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/5 blur-3xl"></div>
            </div>

            {/* Navigation */}
            <nav className="relative z-10 border-b border-darkHover bg-darkSecondary/50 backdrop-blur-sm px-6 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <IoCodeSlash size={24} className="text-primary" />
                        <span className="text-xl font-bold">Code-Sync</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-400">Already have an account?</span>
                        <Link 
                            to="/login" 
                            className="rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-all duration-200 hover:bg-primary/90"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
                <div className="w-full max-w-lg">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="mb-2 text-3xl font-bold text-white">Join Code-Sync</h1>
                        <p className="text-gray-400">
                            Start your collaborative coding journey today
                        </p>
                    </div>

                    {/* Signup Form */}
                    <div className="rounded-xl border border-darkHover bg-darkSecondary/50 backdrop-blur-sm p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Fields */}
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-300">
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <IoPerson size={20} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-lg border border-darkHover bg-dark pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                            placeholder="First name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-300">
                                        Last Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <IoPerson size={20} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-lg border border-darkHover bg-dark pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                            placeholder="Last name"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <IoMail size={20} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-lg border border-darkHover bg-dark pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <IoLockClosed size={20} className="text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-lg border border-darkHover bg-dark pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="Create a strong password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                                    >
                                        {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                                    </button>
                                </div>
                                
                                {/* Password Requirements */}
                                {formData.password && (
                                    <div className="mt-3 space-y-2">
                                        <p className="text-sm text-gray-400">Password requirements:</p>
                                        <div className="grid gap-1 text-xs">
                                            <div className={`flex items-center gap-2 ${passwordValidation.minLength ? 'text-green-400' : 'text-gray-500'}`}>
                                                <LuCheck size={12} />
                                                <span>At least 8 characters</span>
                                            </div>
                                            <div className={`flex items-center gap-2 ${passwordValidation.hasUpperCase ? 'text-green-400' : 'text-gray-500'}`}>
                                                <LuCheck size={12} />
                                                <span>One uppercase letter</span>
                                            </div>
                                            <div className={`flex items-center gap-2 ${passwordValidation.hasLowerCase ? 'text-green-400' : 'text-gray-500'}`}>
                                                <LuCheck size={12} />
                                                <span>One lowercase letter</span>
                                            </div>
                                            <div className={`flex items-center gap-2 ${passwordValidation.hasNumbers ? 'text-green-400' : 'text-gray-500'}`}>
                                                <LuCheck size={12} />
                                                <span>One number</span>
                                            </div>
                                            <div className={`flex items-center gap-2 ${passwordValidation.hasSpecialChar ? 'text-green-400' : 'text-gray-500'}`}>
                                                <LuCheck size={12} />
                                                <span>One special character</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-300">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <IoLockClosed size={20} className="text-gray-400" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                        className={`w-full rounded-lg border bg-dark pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 ${
                                            formData.confirmPassword && formData.password !== formData.confirmPassword
                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                : 'border-darkHover focus:border-primary focus:ring-primary'
                                        }`}
                                        placeholder="Confirm your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                                    >
                                        {showConfirmPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                                    </button>
                                </div>
                                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                    <p className="mt-1 text-xs text-red-400">Passwords do not match</p>
                                )}
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="mt-1 rounded border-darkHover bg-dark text-primary focus:ring-primary focus:ring-offset-dark"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-300">
                                    I agree to the{" "}
                                    <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors">
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link to="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>

                            {/* Signup Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full rounded-lg bg-gradient-to-r from-primary to-blue-500 px-6 py-3 font-semibold text-white transition-all duration-200 hover:from-primary/90 hover:to-blue-500/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isLoading ? "Creating Account..." : "Create Account"}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center">
                            <div className="flex-1 border-t border-darkHover"></div>
                            <span className="px-4 text-sm text-gray-400">Or sign up with</span>
                            <div className="flex-1 border-t border-darkHover"></div>
                        </div>

                        {/* Social Signup Buttons */}
                        <div className="grid gap-3">
                            <button
                                onClick={() => handleSocialSignup("GitHub")}
                                className="flex items-center justify-center gap-3 rounded-lg border border-darkHover bg-dark px-4 py-3 font-medium text-white transition-all duration-200 hover:border-gray-600 hover:bg-darkSecondary"
                            >
                                <LuGithub size={20} />
                                Continue with GitHub
                            </button>
                            <button
                                onClick={() => handleSocialSignup("Google")}
                                className="flex items-center justify-center gap-3 rounded-lg border border-darkHover bg-dark px-4 py-3 font-medium text-white transition-all duration-200 hover:border-gray-600 hover:bg-darkSecondary"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Continue with Google
                            </button>
                        </div>
                    </div>

                    {/* Additional Links */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Already have an account?{" "}
                            <Link 
                                to="/login" 
                                className="font-semibold text-primary hover:text-primary/80 transition-colors"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="mt-8 rounded-xl border border-darkHover bg-darkSecondary/30 p-6">
                        <h3 className="mb-4 text-lg font-semibold text-white">What you'll get:</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <span className="text-sm text-gray-300">Free access to all features</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                                <span className="text-sm text-gray-300">Unlimited collaborative sessions</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                                <span className="text-sm text-gray-300">AI-powered code assistance</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                                <span className="text-sm text-gray-300">Priority customer support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage 