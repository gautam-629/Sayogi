import React, { useEffect } from 'react'
import Avatar from '../../components/shared/Avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux'
import { fetchallServiceSeeker } from '../../store/AuthSlice';
const AllServiceSeeker = () => {
    let dispatch = useDispatch();
    const { users } = useSelector((state) => state.auth.users);
    useEffect(() => {
        dispatch(fetchallServiceSeeker());
    }, [])

    return (
        <>
            <div className='grid grid-cols-5 mt-10 gap-y-6'>
                    {
                       users && Array.isArray(users) &&
                        users.map((user)=>(
                            <Avatar key={user.id} id={user.id} img={user.avatar} name={user.name} rating={user.rating} title={user.title}/>
                        ))
                    }
            </div>
        </>
    )
}

export default AllServiceSeeker;