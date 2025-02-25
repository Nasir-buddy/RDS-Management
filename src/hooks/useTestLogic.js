
import { useState, useEffect } from 'react';

const useTestLogic = () => {
    const [currentDisparity, setCurrentDisparity] = useState(0);
    const [breakPoint, setBreakPoint] = useState(null);
    const [recoveryPoint, setRecoveryPoint] = useState(null);
    const [isTesting, setIsTesting] = useState(false);
    const [testResults, setTestResults] = useState([]);

    const startTest = () => {
        setCurrentDisparity(0);
        setBreakPoint(null);
        setRecoveryPoint(null);
        setIsTesting(true);
    };

    const updateDisparity = (increaseRate) => {
        if (isTesting) {
            setCurrentDisparity(prev => prev + increaseRate);
        }
    };

    const markBreakPoint = () => {
        if (isTesting && breakPoint === null) {
            setBreakPoint(currentDisparity);
        }
    };

    const markRecoveryPoint = () => {
        if (isTesting && breakPoint !== null && recoveryPoint === null) {
            setRecoveryPoint(currentDisparity);
            setIsTesting(false);
            recordResult();
        }
    };

    const recordResult = () => {
        const result = {
            breakPoint,
            recoveryPoint,
            timestamp: new Date().toISOString(),
        };
        setTestResults(prev => [...prev, result]);
    };

    return {
        currentDisparity,
        breakPoint,
        recoveryPoint,
        isTesting,
        testResults,
        startTest,
        updateDisparity,
        markBreakPoint,
        markRecoveryPoint,
    };
};

export default useTestLogic;