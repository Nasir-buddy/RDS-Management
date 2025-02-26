
import { useEffect } from 'react';

// custom hook to handle key press events
const useKeyPress = (targetKey, callback) => {
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === targetKey) {
                callback();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [targetKey, callback]);
};

export default useKeyPress;