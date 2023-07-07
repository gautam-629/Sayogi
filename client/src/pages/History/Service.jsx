import React,{useState,useEffect} from 'react';
import HistoryCard from '../../components/shared/HistoryCard/HistoryCard';
import { findServiceHistory } from '../../http';
import { useSelector } from 'react-redux';
const Service = () => {
    const [serviceHistory, setServiceHistory] = useState([]);
    const { accessToken } = useSelector((state) => state.auth.token);
    useEffect(() => {
        (async () => {
            try {
                const res = await findServiceHistory(accessToken);
                setServiceHistory(res.data.serviceRequest);
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    return (
        <>
            <div className='relative'>
                <span className='text-textColor border-b-4 border-blue  text-2xl  font-bold'>
                   Your Service Request History</span>
                <img className='inline w-6 mb-4 ml-2' src="/img/like.png" alt="" />
            </div>
            <div className='flex flex-wrap mt-8 overflow-y-scroll gap-8 '>
                {
                    serviceHistory.map((data)=>(
                        <HistoryCard key={data._id} service={data} />
                    ))
                }
               
            </div>
        </>

    )
}

export default Service