import { useState } from "react"
import { motion } from 'framer-motion'
import { Eye, EyeClosed, Loader, Lock } from "lucide-react"
import { useAuthStore } from "../store/authStore"
import Input from "../components/Input"
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const ResetPasswordPage = () => {

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { error, isLoading, resetPassword, message } = useAuthStore()

  const navigate = useNavigate()
  const { token, email } = useParams()

  const handleReset = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Password does not match!')
      return
    }
    try {
      await resetPassword(email, token, password)
      const { message } = useAuthStore.getState()
      toast.success(message)
      navigate('/')
    } catch (err) {
      const { error } = useAuthStore.getState()
      console.log(err)
      toast.error(error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl 
    rounded-2xl shadow-xl overflow-hidden'
    >
      <div className="p-8">
        {/* heading :  */}
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400
        to-emerald-500 text-transparent bg-clip-text ">
          Reset Password
        </h2>
        {/* form : */}
        <form onSubmit={handleReset}>
          <Input
            icon={Lock}
            placeholder='Enter Password'
            name='password'
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            eyeOpen={Eye}
            eyeClose={EyeClosed}
          />
          <Input
            icon={Lock}
            placeholder='Confirm Password'
            name='password2'
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value) }}
            eyeOpen={Eye}
            eyeClose={EyeClosed}
          />
          {error && <p className='text-red-500 mb-2 font-semibold'>{error}</p>}
          {/* button */}
          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600
           text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 
           focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
           focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            {isLoading ? <Loader className='animate-spin mx-auto' /> : 'Reset'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default ResetPasswordPage