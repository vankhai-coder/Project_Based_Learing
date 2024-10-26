import { FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/authSlice'

const Header = () => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    return (
        <header className='header'>
            <div className="logo">
                <Link to="/">Manage Profile</Link>
            </div>
            <ul>
                {user ?
                    (<li>
                        <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>)
                    :
                    (
                        <>
                            <li>
                                <Link to='/login'>
                                    <FaUser /> Login
                                </Link>
                            </li>
                            <li>
                                <Link to='/register'>
                                    <FaUser /> Register
                                </Link>
                            </li>
                        </>
                    )}



            </ul>
        </header>
    )
}

export default Header