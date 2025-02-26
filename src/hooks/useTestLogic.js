import { useState, useCallback, useEffect } from 'react';
import { TEST_TYPES, DEFAULT_INCREASE_RATE } from '../utils/constants';
import { pixelsToArcSeconds } from '../utils/calculations';

// Custom hook to handle test logic
const useTestLogic = (viewingDistance = 60, screenWidth = 40) => {
    const [currentDisparity, setCurrentDisparity] = useState(0);
    const [breakPoint, setBreakPoint] = useState(null);
    const [recoveryPoint, setRecoveryPoint] = useState(null);
    const [isTesting, setIsTesting] = useState(false);
    const [testDirection, setTestDirection] = useState('Convergence');
    const [testNumber, setTestNumber] = useState(1);
    const [disparityIncreaseRate, setDisparityIncreaseRate] = useState(DEFAULT_INCREASE_RATE);
    
    // Timer for auto-incrementing disparity
    useEffect(() => {
        let timer;
        if (isTesting && breakPoint === null) {
            timer = setInterval(() => {
                setCurrentDisparity(prev => {
                    return testDirection === 'Convergence' 
                        ? prev + disparityIncreaseRate 
                        : prev - disparityIncreaseRate;
                });
            }, 500); 
        }
        return () => clearInterval(timer);
    }, [isTesting, breakPoint, testDirection, disparityIncreaseRate]);
    
    // Function to start a new test
    const startTest = useCallback((testParams = {}) => {
        const direction = testParams.testDirection || 'Convergence';
        setTestDirection(direction);
        setDisparityIncreaseRate(testParams.increaseRate || DEFAULT_INCREASE_RATE);
        setCurrentDisparity(0);
        setBreakPoint(null);
        setRecoveryPoint(null);
        setIsTesting(true);
    }, []);
    // Function to mark the break point
    const markBreakPoint = useCallback(() => {
        if (isTesting && breakPoint === null) {
            // Convert current pixel disparity to arc seconds
            const breakDisparity = pixelsToArcSeconds(
                Math.abs(currentDisparity), 
                viewingDistance, 
                screenWidth
            ).toFixed(1);
            
            setBreakPoint(breakDisparity);
        }
    }, [isTesting, breakPoint, currentDisparity, viewingDistance, screenWidth]);
    // Function to mark the recovery point
    const markRecoveryPoint = useCallback(() => {
        if (isTesting && breakPoint !== null && recoveryPoint === null) {
            // Convert current pixel disparity to arc seconds
            const recoveryDisparity = pixelsToArcSeconds(
                Math.abs(currentDisparity), 
                viewingDistance, 
                screenWidth
            ).toFixed(1);
            
            setRecoveryPoint(recoveryDisparity);
            setIsTesting(false);
            
            // Return the result for recording
            return {
                test_num: testNumber,
                type: testDirection,
                break_point: breakPoint,
                recovery_point: recoveryDisparity,
                time: new Date().toLocaleString()
            };
        }
        return null;
    }, [isTesting, breakPoint, recoveryPoint, currentDisparity, testNumber, testDirection, viewingDistance, screenWidth]);
    
    // Function to complete the test
    const completeTest = useCallback(() => {
        const result = markRecoveryPoint();
        setTestNumber(prev => prev + 1);
        return result;
    }, [markRecoveryPoint]);
    
    // Return the test logic functions and state
    return {
        currentDisparity,
        breakPoint,
        recoveryPoint,
        isTesting,
        testDirection,
        startTest,
        markBreakPoint,
        markRecoveryPoint,
        completeTest
    };
};

export default useTestLogic;