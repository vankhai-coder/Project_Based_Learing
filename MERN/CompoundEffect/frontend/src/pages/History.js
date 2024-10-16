import React, { useEffect } from 'react'
import numeral from 'numeral';
import HistoryModal from '../components/HistoryModal'
import { useDispatch, useSelector } from 'react-redux';
import { loadHistory } from '../redux/slice/compoundEffectSlice'
import { Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const History = () => {
  const { history, loading, error, deleteError } = useSelector(store => store.compoundEffect)
  const { user } = useSelector(store => store.user)
  const dispatch = useDispatch()


  useEffect(() => {
    if (!history) {
      //fetch : 
      // dispatch async function : 
      dispatch(loadHistory())
    }
  }, [dispatch , history])
  useEffect(() => {
    if (deleteError) {
      toast.error("Cannot delete this now!", {
        // position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [deleteError])

  if (!user) {
    return <>You must log in first to see list </>
  }
  if (error) {
    return (
      <>there are some error</>
    )
  }
  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }


  return (
    <div>
      <ToastContainer />
      {!history && <div className='text-center my-5'>Nothing to display , maybe some errors ocur...</div>}
      {history && history.map((ce, index) => (
        <div key={ce._id} className='my-3'>
         { console.log(ce._id)}
          
          <HistoryModal ce={ce} message={`After ${ce.years[ce.years.length - 1]} , you have ${numeral(ce.futureAmount[ce.futureAmount.length - 1]).format('0,0')} in return`} />
        </div>
      ))}
    </div>
  )
}

export default History