import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
const useSocketConnection = () => {

  const sucessNotify = (msg) => toast.success(`${msg}`)
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    if (currentUser) {
      socket.emit('joinRoom', currentUser.id);
      socket.on('recNoti', (data) => {
       sucessNotify(`${data.senderName} request You 💛`)
      });
    }
    return () => {
      socket.disconnect();
    };
  }, [sucessNotify]);
  return null;
};

export default useSocketConnection;
