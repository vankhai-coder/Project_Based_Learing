import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
import useLogout from '../hooks/useLogout'
import { useDispatch, useSelector } from 'react-redux'

const RootLayout = () => {
  const { logout } = useLogout()
  const user = useSelector(store => store.user.user)
  const handleLogout = () => {
    logout()
  }

  return (
    <div>

      <header>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <NavLink href="/">Top CV</NavLink>

            <Nav className="mx-auto">
              <NavLink to='/' variant="info" >Home</NavLink>
              <NavLink
                to='caculate'
                className='mx-5'
              >Caculate</NavLink>
              {/* <NavLink to='history'>History</NavLink> */}
              <NavLink to='recycle'>Recycle</NavLink>
            </Nav>

            <Nav className="ms-auto">
              {!user && (<div>
                <NavLink to='/login' className='mx-5' >Login</NavLink>
                <NavLink to='/signup'>Sign up</NavLink>
              </div>)}
              {user && (<div>
                <a  style={{color : 'white'}} className='me-5'>{user.email}</a>
                <button onClick={handleLogout} >Log out</button>
              </div>)}
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main>
        <Outlet />
      </main>
    </div>

  )
}

export default RootLayout