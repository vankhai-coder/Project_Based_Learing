import FloatingShape from './components/FloatingShape.jsx'
import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage.jsx'
import LogInPage from './pages/LogInPage.jsx'
import Home from './pages/Home.jsx'
import EmailVerification from './pages/EmailVerification.jsx'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore.js'
import { useEffect } from 'react'
import RedirectAuthenticatedUser from './components/RedirectAuthenticatedUser.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'

export default function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  if (isCheckingAuth) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center 
    relative overflow-hidden ">
      {/* 3 floating shapes : */}
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay='0' />
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay='5' />
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay='2' />

      {/* routes : */}
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
        <Route path='/signup' element={
          <RedirectAuthenticatedUser>
            <SignUpPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path='/login' element={
          <RedirectAuthenticatedUser>
            <LogInPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path='/verify-email' element={<EmailVerification />} />
        <Route path='/forgot-password' element={
          <RedirectAuthenticatedUser>
            <ForgotPasswordPage />
          </RedirectAuthenticatedUser>} />
        <Route path='/reset-password/:token/:email' element={
          <RedirectAuthenticatedUser>
            <ResetPasswordPage />
          </RedirectAuthenticatedUser>} />
      </Routes>

      {/* toast notification : */}
      <Toaster />

    </div>
  )
}