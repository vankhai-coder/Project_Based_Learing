import { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '../components/Input.jsx'
import { Eye, EyeClosed, Loader, Lock, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore.js'

const LogInPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useAuthStore()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(email , password)
    } catch (error) {
      console.log(error)
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
          Welcome Back
        </h2>
        {/* form : */}
        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type='email'
            placeholder='Email Address'
            value={email}
            name='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type='text'
            placeholder='Enter Password'
            name='password'
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            eyeOpen={Eye}
            eyeClose={EyeClosed}
          />
          <div className="flex items-center mb-6">
            <Link to='/forgot-password' className='text-sm text-green-400 hover:underline'>
              Forgot Password
            </Link>
          </div>
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
            {isLoading ? <Loader className='animate-spin mx-auto' /> : 'Log In'}
          </motion.button>
        </form>

      </div>

      {/* dont have account : */}
      <div className="px-8 py-4 bg-gray-800 bg-opacity-50 flex justify-center ">
        <p className="text-sm text-gray-400">
          Don't have an account ?{" "}
          <Link to={'/signup'} className='text-green-400 hover:underline'>
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default LogInPage