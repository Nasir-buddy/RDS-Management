import React, { useState } from 'react';
import TestParameters from './TestParameters';
import { 
  DEFAULT_VIEWING_DISTANCE_CM, 
  DEFAULT_SCREEN_WIDTH_CM, 
  DEFAULT_DOT_SIZE, 
  DEFAULT_DOT_DENSITY,
  DEFAULT_INCREASE_RATE,
  TEST_TYPES
} from '../../utils/constants';

const ControlPanel = ({ onTestStart, onTestComplete, isTesting, breakPoint, recoveryPoint }) => {
    const [parameters, setParameters] = useState({
        viewingDistance: DEFAULT_VIEWING_DISTANCE_CM,
        screenWidth: DEFAULT_SCREEN_WIDTH_CM,
        dotSize: DEFAULT_DOT_SIZE,
        dotDensity: DEFAULT_DOT_DENSITY,
        increaseRate: DEFAULT_INCREASE_RATE,
        testDirection: TEST_TYPES[0]
    });

    const handleStartClick = () => {
        onTestStart(parameters);
    };

    const handleBreakClick = () => {
        // Handle the break point marking
        onTestComplete('break');
    };

    const handleRecoveryClick = () => {
        // Handle the recovery point marking
        onTestComplete('recovery');
    };

    return (
        <div className="control-panel p-4 bg-gray-800 rounded-lg mb-4">
            <h2 className="text-2xl font-bold mb-4">Control Panel</h2>
            
            {!isTesting ? (
                <>
                    <TestParameters parameters={parameters} setParameters={setParameters} />
                    <div className="flex flex-col space-y-4 mt-4">
                        <button 
                            onClick={handleStartClick} 
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        >
                            Start Test
                        </button>
                    </div>
                </>
            ) : (
                <div className="space-y-4">
                    <div className="text-white p-4 rounded bg-blue-900">
                        <p className="font-bold">Test in Progress: {parameters.testDirection}</p>
                        <p>Press the appropriate button when you experience the change:</p>
                    </div>
                    
                    <div className="flex space-x-4">
                        <button 
                            onClick={handleBreakClick}
                            disabled={breakPoint !== null}
                            className={`py-2 px-4 rounded ${
                                breakPoint === null 
                                    ? 'bg-yellow-500 hover:bg-yellow-600' 
                                    : 'bg-gray-500 cursor-not-allowed'
                            }`}
                        >
                            Mark Break Point
                        </button>
                        
                        <button 
                            onClick={handleRecoveryClick}
                            disabled={breakPoint === null || recoveryPoint !== null}
                            className={`py-2 px-4 rounded ${
                                breakPoint !== null && recoveryPoint === null
                                    ? 'bg-green-500 hover:bg-green-600' 
                                    : 'bg-gray-500 cursor-not-allowed'
                            }`}
                        >
                            Mark Recovery Point
                        </button>
                    </div>
                    
                    <div className="text-sm mt-2 text-gray-300">
                        {breakPoint === null ? (
                            <p>Increasing disparity - press "Mark Break Point" when the image breaks into two images</p>
                        ) : recoveryPoint === null ? (
                            <p>Moving back to unity - press "Mark Recovery Point" when the images fuse back together</p>
                        ) : (
                            <p>Test complete</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ControlPanel;