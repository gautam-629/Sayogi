import React, { useEffect } from 'react'
import Avatar from '../../components/shared/Avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux'
import { fetchallServiceSeeker } from '../../store/serviceSeekerSlide';
const AllServiceSeeker = () => {
    let dispatch = useDispatch();
    const { serviceSeeker } = useSelector((state) => state.serviceSeekers.serviceSeeker);

    useEffect(() => {
        dispatch(fetchallServiceSeeker());
    }, [])

    return (
        <>
            <div className='grid grid-cols-5 mt-10 gap-y-6'>
                {serviceSeeker && Array.isArray(serviceSeeker) && // Add a null and array check for serviceSeeker
                    serviceSeeker.map((data) => (
                        <Avatar key={data.id} id={data.id} img={data.avatar} name={data.name} rating={data.rating} title={data.title} />
                    ))}
            </div>
        </>
    )
}

export default AllServiceSeeker;