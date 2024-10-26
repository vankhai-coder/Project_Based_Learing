import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Caculate from './pages/Caculate'
import History from './pages/History'
import { loadHistory } from './loader/loadHistory'
import CustomErrorElement from './error/CustomErrorElement'
import Recycle from './pages/Recycle'
import { formAction } from './formActions.js/CaculateFormAction'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useSelector } from 'react-redux'

function App() {

  const user = useSelector(store => store.user.user)
  console.log(user);
  


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />} errorElement={<CustomErrorElement />} >
        <Route index element={user ? <Home /> : <Navigate to='/login' />} />
        <Route
          path='caculate'
          element={<Caculate />}
          action={formAction}
        />
        <Route
          path='history'
          element={<History />}
          loader={loadHistory}
        />
        <Route
          path='recycle'
          element={<Recycle />}
          // loader={'loadRecycle'}
          errorElement={<CustomErrorElement />}
        />
        <Route
          path='login'
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path='signup'
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
      </Route>


    )
  )

  return (
    <RouterProvider router={router} />
  );
}

export default App;
