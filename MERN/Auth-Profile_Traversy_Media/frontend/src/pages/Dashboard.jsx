import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdDashboard } from "react-icons/md"
import { update, reset } from '../features/authSlice'
import { toast } from 'react-toastify'
import Spinner from "../components/Spinner"

const Dashboard = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isLoading, isSuccess, message } = useSelector(state => state.auth)
  const { name, email } = user ? user : { name: '', email: '' }

  const [editedUser, setEditedUser] = useState({
    name,
    email,
    password: ''
  })
  const isChange = () => (name !== editedUser.name || email !== editedUser.email || editedUser.password.trim() !== '')

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success('Update successfully!')
      setEditedUser(pre=>({
        ...pre , 
        password : ''
      }))
    }
    dispatch(reset())
  }, [navigate, user, isError, isSuccess, dispatch])

  const editProfile = () => {
    dispatch(update(editedUser))
  }
  const onChange = (e) => {
    setEditedUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div>
      <section className="heading">
        <h1>
          <MdDashboard /> User : {user && user.name}
        </h1>
        <p>View and edit your profile</p>
      </section>
      <section className="form">
        <form onSubmit={editProfile} >
          <div className="form-group">
            <input
              type="text"
              className='form-control'
              id='name'
              name='name'
              value={editedUser.name}
              placeholder='Enter your new name'
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className='form-control'
              id='email'
              name='email'
              value={editedUser.email}
              placeholder='Enter your new email'
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className='form-control'
              id='password'
              name='password'
              value={editedUser.password}
              placeholder='Enter your new password'
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            {isChange() && <button type='submit' className="btn btn-block">Edit</button>}
          </div>
        </form>

      </section>
    </div>
  )
}

export default Dashboard