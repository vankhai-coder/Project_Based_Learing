import { motion } from "framer-motion"
import { Eye, EyeClosed, Loader, Lock, Mail, User } from 'lucide-react'
import Input from "../components/Input"
import { useState } from "react"
import { Link } from 'react-router-dom'
import PasswordStrengthMeter from "../components/PasswordStrengthMeter"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router-dom"

const SignUpPage = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { signup, error, isLoading } = useAuthStore()

  const handleSignup = async (e) => {
    e.preventDefault()

    try {
      await signup(email, password, name)
      navigate('/verify-email')
    } catch (error) {
      console.log('error : ', error.message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 
      backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      {/* div that padding : */}
      <div className="p-8">

        {/* heading : create account  */}
        <h2 className="text-3xl font-bold mb-6 text-center 
        bg-gradient-to-r from-green-400 to-emerald-500 
        text-transparent bg-clip-text">
          Create Account
        </h2>

        {/* form : */}
        <form onSubmit={handleSignup}>
          <Input
            icon={User}
            type='text'
            placeholder='Enter Name'
            name='name'
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />
          <Input
            icon={Mail}
            type='text'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
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
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          {/* Password strength meter */}
          <PasswordStrengthMeter password={password} />
          {/* button */}
          <motion.button
            className={`mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600
           text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 
           focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
           focus:ring-offset-gray-900 transition duration-200 ${isLoading ? 'bg-black' : ''} `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (<Loader className="mx-auto animate-spin" />) : ' Sign Up'}
          </motion.button>
        </form>
      </div>
      {/* Already have account : */}
      <div className="px-8 py-4 bg-gray-800 bg-opacity-50 flex justify-center ">
        <p className="text-sm text-gray-400">
          Already have an account ?{" "}
          <Link to={'/login'} className='text-green-400 hover:underline'>
            Log in
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default SignUpPage