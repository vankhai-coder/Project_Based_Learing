import { useState } from "react"
import { useAuthStore } from "../store/authStore"
import { motion } from 'framer-motion'
import Input from "../components/Input"
import { ArrowLeft, Loader, Mail } from "lucide-react"
import { Link } from "react-router-dom"
import { toast } from 'react-hot-toast'

const ForgotPasswordPage = () => {

  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { isLoading, forgotPassword} = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await forgotPassword(email)
      const { message } = useAuthStore.getState()
      setIsSubmitted(true)
      toast.success(message)
    } catch (err) {
      const { error } = useAuthStore.getState()
      toast.error(error)
      console.log(err)
    }

  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full bg-gray-800 opacity-50 backdrop-filter backdrop-blur-xl 
      rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-tr from-green-400
        to-emerald-500 text-transparent bg-clip-text ">
          Forgot Password
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="text-gray-300 mb-2 text-center">
              Enter email address and we will sent you a link to reset password
            </p>
            <Input
              icon={Mail}
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scalse: 0.95 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 
            text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900
            transition duration-200"
              type="submit"
            >
              {isLoading ? <Loader className="mx-auto animate-spin" /> : 'Send Reset Link'}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-16 h-16 bg-green-500 rounded-full flex justify-center items-center
              mx-auto mb-4 "
            >
              <Mail className="text-white w-8 h-8" />
            </motion.div>
            <p className="text-gray-300 mb-6">If an account exist for {email} ,you will recieve reset link soon</p>
          </div>
        )}
      </div>
      <div className="px-8 py-4 bg-gray-800 bg-opacity-50 flex justify-center">
        <Link to={'/login'} className="text-sm text-green-400 hover:underline flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to login
        </Link>
      </div>
    </motion.div>
  )
}

export default ForgotPasswordPage