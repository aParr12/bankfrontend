import './Toast.css';
import {useCallback, useEffect, useState} from 'react';

export const Toast = ({message, shouldDisappear}) => {
  const [disappearFlag, setDisappearFlag] = useState(false);

  const prepareToDisappear = useCallback(() => {
    setDisappearFlag(true);
    setTimeout(() => {
      shouldDisappear();
    }, 300);
  }, [shouldDisappear]);

  useEffect(() => {
    setTimeout(() => {
      prepareToDisappear();
    }, 3000);
  }, [prepareToDisappear]);

  return (
      <div className="CustomToastContainer" onClick={prepareToDisappear}>
        <div className={disappearFlag ? 'custom-toast disappear' : 'custom-toast'}>
          <div className="toast-body">
            {message}
          </div>
        </div>
      </div>
  );
};
