import React,{useEffect} from 'react'
import SlideBar from './SlideBar'
import { useSelector,useDispatch } from 'react-redux';
import { fetchallServiceSeeker } from '../store/AuthSlice';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  let dispatch=useDispatch()
  const { users } = useSelector((state) => state.auth.users);

  useEffect(() => {
    dispatch(fetchallServiceSeeker());
}, [])
  return (
    <>  
  <div className='grid grid-cols-12'>
    <div className='col-span-3'>
    <SlideBar/>
    </div>
    <div className='col-span-9 mt-16'>
      <div className='mb-20'>
        <h1 className='text-textColor font-bold text-2xl border-b-4 inline border-blue'>Dashboard</h1>
      </div>
      <div className='bg-secBackColor rounded-md px-10 mx-5 py-3 text-center'>
         <h2 className='text-secTextColor'>Total Amount</h2>
         <h2 className='text-textColor font-bold'>Rs.50000</h2>
      </div>
      <div className='w-28 h-24 rounded-md bg-blue text-center my-6 ml-5'>
          <h2 className=' text-teal-50 text-xl'>Users</h2>
          <h2 className=' text-textColor text-lg font-bold'>{users && users.length}</h2>
          <hr className='' />
         <Link to={'/users'}>
          <h4 className='text-secTextColor cursor-pointer'>View Detail</h4>
         </Link>  
      </div>
    </div>
</div>
    </>
    
  )
}

export default Dashboard