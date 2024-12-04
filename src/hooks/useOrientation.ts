import {useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';

const useOrientation = () => {
  const [orientation, setOrientation] = useState<string>('');
  const window = useWindowDimensions();

  // Check if the window width is greater than the window height
  useEffect(() => {
    if (window.width > window.height) {
      setOrientation('landscape');
    } else {
      setOrientation('portrait');
    }
  }, [window]);

  return orientation;
};

export default useOrientation;
