import React,{useState} from 'react'
import { Link } from 'react-router-dom'
const SlideBar = () => {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  return (
    <div>
    <div className={`bg-secBackColor shadow-lg duration-300 h-screen ${open ? "w-72" : "w-20"} p-5 pt-8 relative`}>
      <img onClick={(e) => setOpen(!open)} className={`absolute -right-3 top-9 ${!open && 'rotate-180'} cursor-pointer`} src={'/img/arrowUp.png'} width={30} height={20} alt='arrow' />

      {/* logo */}
      <Link to={'/'}>
      <div className='flex gap-x-4'>
        <img className={`${open && 'rotate-90'} duration-500`} src={'/img/logo.png'} width={30} height={20} alt='logo' />
        <h1 className={`text-textColor duration-300 text-3xl ${!open && 'scale-0'} font-bold`}>Sayogi</h1>
      </div>
      </Link>
      
      {/* list item */}
      <ul className='mt-3 gap-y-2'>
        <li className='flex gap-x-3 items-center pt-2 '>
          <img src={'/img/dash.png'} height={10} width={25} alt='DashBoard' />
          <Link to={'/dashboard'}><span className={`text-textColor ${!open && 'hidden'} cursor-pointer hover:border-b-4 border-blue text-xl font-bold`}>DashBoard</span></Link>
        </li>

        <li className='flex gap-x-3 items-center pt-3'>
          <img src={'/img/users.png'} height={10} width={25} alt='create porfile' />
          <Link to={'/users'}>
            <span className={`text-textColor ${!open && 'hidden'} cursor-pointer hover:border-b-4 border-blue text-xl font-bold`}>Users</span>
          </Link>
        </li>

        <li className='flex gap-x-3 items-center pt-3'>
          <img src={'/img/hiredList.png'} height={10} width={25} alt='create porfile' />
          <Link to={'/hiredUser'}> <span className={`text-textColor ${!open && 'hidden'} cursor-pointer hover:border-b-4 border-blue text-xl font-bold`}>Hired List</span></Link>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default SlideBar