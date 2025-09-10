import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { IoCodeSlash, IoMail, IoCheckmarkCircle, IoArrowBack } from "react-icons/io5"
import { LuRefreshCw } from "react-icons/lu"
import { toast } from "react-hot-toast"

const VerifyEmailPage = () => {
    const navigate = useNavigate()
    const [countdown, setCountdown] = useState(60)
    const [canResend, setCanResend] = useState(false)
    const [isResending, setIsResending] = useState(false)

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        } else {
            setCanResend(true)
        }
    }, [countdown])

    const handleResendEmail = async () => {
        setIsResending(true)
        
        // Simulate resend process
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        toast.success("Verification email sent again!")
        setCountdown(60)
        setCanResend(false)
        setIsResending(false)
    }

    const handleContinue = () => {
        toast.success("Email verified! Welcome to Code-Sync.")
        navigate("/")
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
                    <Link 
                        to="/login" 
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <IoArrowBack size={20} />
                        <span>Back to Login</span>
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    {/* Verification Card */}
                    <div className="rounded-xl border border-darkHover bg-darkSecondary/50 backdrop-blur-sm p-8 text-center">
                        {/* Email Icon */}
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                            <IoMail size={40} className="text-primary" />
                        </div>

                        {/* Header */}
                        <h1 className="mb-2 text-2xl font-bold text-white">Check Your Email</h1>
                        <p className="mb-6 text-gray-400">
                            We've sent a verification link to your email address. 
                            Please check your inbox and click the link to verify your account.
                        </p>

                        {/* Email Address Display */}
                        <div className="mb-6 rounded-lg bg-dark p-4">
                            <p className="text-sm text-gray-400">Email sent to:</p>
                            <p className="font-semibold text-white">user@example.com</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            <button
                                onClick={handleContinue}
                                className="w-full rounded-lg bg-gradient-to-r from-primary to-blue-500 px-6 py-3 font-semibold text-white transition-all duration-200 hover:from-primary/90 hover:to-blue-500/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <IoCheckmarkCircle size={20} />
                                    I've Verified My Email
                                </div>
                            </button>

                            <div className="flex items-center justify-center gap-2">
                                <div className="flex-1 border-t border-darkHover"></div>
                                <span className="px-4 text-sm text-gray-400">or</span>
                                <div className="flex-1 border-t border-darkHover"></div>
                            </div>

                            <button
                                onClick={handleResendEmail}
                                disabled={!canResend || isResending}
                                className="w-full rounded-lg border border-darkHover bg-dark px-6 py-3 font-medium text-white transition-all duration-200 hover:border-gray-600 hover:bg-darkSecondary disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    {isResending ? (
                                        <LuRefreshCw size={20} className="animate-spin" />
                                    ) : (
                                        <IoMail size={20} />
                                    )}
                                    {isResending 
                                        ? "Sending..." 
                                        : canResend 
                                            ? "Resend Email" 
                                            : `Resend in ${countdown}s`
                                    }
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Help Section */}
                    <div className="mt-8 rounded-xl border border-darkHover bg-darkSecondary/30 p-6">
                        <h3 className="mb-4 text-lg font-semibold text-white">Need Help?</h3>
                        <div className="space-y-3 text-sm text-gray-300">
                            <p>
                                • Check your spam or junk folder if you don't see the email
                            </p>
                            <p>
                                • Make sure you entered the correct email address
                            </p>
                            <p>
                                • Contact support if you continue to have issues
                            </p>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Link 
                                to="/contact" 
                                className="text-primary hover:text-primary/80 transition-colors"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>

                    {/* Additional Links */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Didn't receive the email?{" "}
                            <button
                                onClick={handleResendEmail}
                                disabled={!canResend}
                                className="font-semibold text-primary hover:text-primary/80 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Resend verification email
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmailPage 