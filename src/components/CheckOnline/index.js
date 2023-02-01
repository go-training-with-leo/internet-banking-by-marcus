import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useOnline } from 'rooks';

const CheckOnline = ({ children }) => {
  const online = useOnline();
  const prevOnline = useRef();

  useEffect(() => {
    if (!online) {
      toast.info('You are offline', {
        autoClose: false,
        position: 'bottom-right',
        closeOnClick: false,
      });
      prevOnline.current = 'Offline';
    } else if (prevOnline.current === 'Offline' && online) {
      toast.dismiss();
      toast.info('You are online');
      prevOnline.current = 'Online';
    }
  }, [online]);

  return children;
};

export default CheckOnline;
